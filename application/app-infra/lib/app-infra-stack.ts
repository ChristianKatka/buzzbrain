import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";

interface AppInfraStackProps extends StackProps {
  envName: string;
}

export class AppInfraStack extends Stack {
  constructor(scope: Construct, id: string, props: AppInfraStackProps) {
    super(scope, id, props);

    const { envName } = props;

    // 1. Private S3 Bucket (NO website hosting!)
    const appBucket = new s3.Bucket(this, `BuzzBrainApp`, {
      bucketName: `buzzbrain-app-${envName}`,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      enforceSSL: true,
    });

    // 2. Origin Access Identity (OAI) for CloudFront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "AppOAI",
      { comment: `OAI for ${envName}` }
    );

    // 3. Grant OAI read access to the bucket
    appBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [appBucket.arnForObjects("*")],
        principals: [originAccessIdentity.grantPrincipal],
      })
    );

    // 4. Security Headers Policy (HSTS, XSS, etc.)
    const securityHeadersPolicy = new cloudfront.ResponseHeadersPolicy(
      this,
      "SecurityHeadersPolicy",
      {
        comment: "Security headers policy",
        securityHeadersBehavior: {
          // strictTransportSecurity protects against SSL stripping attacks.
          strictTransportSecurity: {
            override: true,
            accessControlMaxAge: Duration.days(365 * 2),
            includeSubdomains: true,
            preload: true,
          },
          xssProtection: { override: true, protection: true, modeBlock: true },
          contentTypeOptions: { override: true },
          // Prevents your site from being embedded in an <iframe>
          frameOptions: {
            override: true,
            frameOption: cloudfront.HeadersFrameOption.DENY,
          },
        },
      }
    );

    // 5. CloudFront Distribution (SPA-friendly)
    new cloudfront.Distribution(this, "AppDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new origins.S3Origin(appBucket, {
          originAccessIdentity,
        }),
        compress: true,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        responseHeadersPolicy: securityHeadersPolicy,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED, // Pre-configured for static assets
      },
      errorResponses: [
        // Handle SPA client-side routing
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: Duration.seconds(0), // Do NOT cache error responses
        },
      ],
      // Optional: Enable logging for debugging
      enableLogging: true,
      logBucket: new s3.Bucket(this, "CloudFrontLogBucket", {
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      }),
    });
  }
}
