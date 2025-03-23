import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface AppInfraStackProps extends StackProps {
  envName: string | undefined;
}

export class AppInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: AppInfraStackProps) {
    super(scope, id, props);
    if (!props?.envName) return;
    const { envName } = props;

    const appBucket = new Bucket(this, "AppBucket", {
      bucketName: `buzzbrain-app-${envName}`,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: new BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
    });

    // CloudFront Distribution
    new Distribution(this, "BuzzBrainDistribution", {
      comment: `buzzbrain-app-distribution-${envName}`,
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(appBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }
}

//// ------------------------------------

// import { Stack, StackProps, RemovalPolicy, Duration } from "aws-cdk-lib";
// import { Construct } from "constructs";
// import * as s3 from "aws-cdk-lib/aws-s3";
// import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
// import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
// import * as iam from "aws-cdk-lib/aws-iam";

// interface AppInfraStackProps extends StackProps {
//   envName: string;
// }

// export class AppInfraStack extends Stack {
//   constructor(scope: Construct, id: string, props: AppInfraStackProps) {
//     super(scope, id, props);

//     const { envName } = props;

//     // S3 bucket with static website hosting, but PRIVATE
//     const siteBucket = new s3.Bucket(this, "AppBucket", {
//       bucketName: `buzzbrain-app-${envName}`,
//       websiteIndexDocument: "index.html",
//       websiteErrorDocument: "index.html",
//       removalPolicy: RemovalPolicy.DESTROY,
//       autoDeleteObjects: true,
//       publicReadAccess: false, // critical
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
//     });

//     // CloudFront Origin Access Identity
//     const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "AppOAI", {
//       comment: `OAI for buzzbrain ${envName}`,
//     });

//     // Grant OAI read access to S3 bucket
//     siteBucket.addToResourcePolicy(
//       new iam.PolicyStatement({
//         actions: ["s3:GetObject"],
//         resources: [`${siteBucket.bucketArn}/*`],
//         principals: [
//           new iam.CanonicalUserPrincipal(originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId),
//         ],
//       })
//     );

//     // CloudFront Distribution using OAI and website endpoint
//     new cloudfront.CloudFrontWebDistribution(this, "AppDistribution", {
//       originConfigs: [
//         {
//           s3OriginSource: {
//             s3BucketSource: siteBucket,
//             originAccessIdentity: originAccessIdentity,
//           },
//           behaviors: [
//             {
//               isDefaultBehavior: true,
//               compress: true,
//               viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
//             },
//           ],
//         },
//       ],
//       errorConfigurations: [
//         {
//           errorCode: 404,
//           responseCode: 200,
//           responsePagePath: "/index.html",
//           errorCachingMinTtl: 300,
//         },
//       ],
//       comment: `buzzbrain-app-distribution-${envName}`,
//       defaultRootObject: "index.html",
//     });
//   }
// }
