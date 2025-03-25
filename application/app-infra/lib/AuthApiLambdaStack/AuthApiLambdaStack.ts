import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getCognitoClientId, getCognitoUserPoolId } from "../../constants";

interface Props extends StackProps {
  envName: string;
}

export class AuthApiLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    // createRoleAndPolicies(this);

    // const authApiLambdaFunction = createAuthApiLambdaFunction(this, envName);

    // createHttpApiGateWay(this, authApiLambdaFunction);

    // 1. Create Lambda Execution Role (matches SAM template exactly)
    const lambdaRole = new iam.Role(this, "LambdaExecutionRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    // 2. Add Cognito permissions (same as SAM template)
    lambdaRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["cognito-idp:*", "dynamodb:*"],
        resources: ["*"],
      })
    );

    // 3. Create Lambda function (equivalent to SAM 'API' resource)
    const apiFunction = new NodejsFunction(this, "API", {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: "lambdas/AuthApi/src/lambda.ts", // Entry TypeScript file
      handler: "handler", // Exported function name
      memorySize: 256,
      depsLockFilePath: "lambdas/AuthApi/package-lock.json",
      timeout: Duration.seconds(30),
      role: lambdaRole,
      environment: {
        COGNITO_USER_POOL_ID: getCognitoUserPoolId(envName),
        COGNITO_CLIENT_ID: getCognitoClientId(envName),
        ENVIRONMENT_NAME: envName,
      },
    });

    // 4. Create HTTP API (matches SAM 'ApiGatewayHttpApi' exactly)
    const httpApi = new apigwv2.HttpApi(this, "ApiGatewayHttpApi", {
      corsPreflight: {
        allowOrigins: ["*"],
        allowHeaders: ["*"],
        allowMethods: [apigwv2.CorsHttpMethod.GET, apigwv2.CorsHttpMethod.POST],
        maxAge: Duration.seconds(60),
      },
      defaultIntegration: new integrations.HttpLambdaIntegration(
        "DefaultIntegration",
        apiFunction,
        {
          payloadFormatVersion: apigwv2.PayloadFormatVersion.VERSION_1_0, // THIS IS GRUCIAL NOTHING WORKS OTHERWISE
          // v1.0 (works)
          // {
          //   "path": "/auth/login",
          //   "httpMethod": "POST"
          // }

          // // v2.0 (broke your routes)
          // {
          //   "requestContext": {
          //     "http": {
          //       "path": "/auth/login",
          //       "method": "POST"
          //     }
          //   }
          // }
        }
      ),
    });
  }
}
