import { Duration } from "aws-cdk-lib";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export const createHttpApiGateWay = (
  stack: Construct,
  authApiLambdaFunction: NodejsFunction
) => {
  const httpApi = new apigwv2.HttpApi(stack, "HttpAuthApi", {
    defaultIntegration: new integrations.HttpLambdaIntegration(
      "DefaultIntegration",
      authApiLambdaFunction
    ),
    corsPreflight: {
      allowOrigins: ["*"],
      allowMethods: [apigwv2.CorsHttpMethod.ANY],
      allowHeaders: ["*"],
      maxAge: Duration.days(1),
    },
    createDefaultStage: true,
  });
};
