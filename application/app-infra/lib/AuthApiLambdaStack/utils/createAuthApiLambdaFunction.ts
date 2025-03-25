import { Duration, aws_lambda as lambda } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getCognitoClientId, getCognitoUserPoolId } from "../../../constants";

export const createAuthApiLambdaFunction = (
  stack: Construct,
  envName: string
) => {
  const functionName = `${envName}-auth-api-function`;
  const logicalId = `AuthApiFunction`;
  const description = "Handles application authentication via cognito.";

  const authApiLambdaFunction = new NodejsFunction(stack, logicalId, {
    functionName,
    description,
    runtime: lambda.Runtime.NODEJS_20_X,
    entry: "lambdas/AuthApi/src/lambda.ts", // Entry TypeScript file
    handler: "handler", // Exported function name
    depsLockFilePath: "lambdas/AuthApi/package-lock.json",
    timeout: Duration.seconds(30),
    environment: {
      COGNITO_USER_POOL_ID: getCognitoUserPoolId(envName),
      COGNITO_CLIENT_ID: getCognitoClientId(envName),
      ENVIRONMENT: envName,
    },
  });

  return authApiLambdaFunction;
};
