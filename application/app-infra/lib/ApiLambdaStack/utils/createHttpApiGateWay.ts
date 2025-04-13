import { Duration } from "aws-cdk-lib";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpJwtAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export const createHttpApiGateWay = (
  stack: Construct,
  apiFunction: NodejsFunction,
  jwtAuthorizer: HttpJwtAuthorizer
) => {
  new apigwv2.HttpApi(stack, "Api", {
    corsPreflight: {
      allowOrigins: ["*"],
      allowHeaders: ["*"],
      allowMethods: [apigwv2.CorsHttpMethod.GET, apigwv2.CorsHttpMethod.POST],
      maxAge: Duration.seconds(60),
    },
    defaultAuthorizer: jwtAuthorizer,
    defaultIntegration: new integrations.HttpLambdaIntegration(
      "DefaultIntegration",
      apiFunction,
      {
        payloadFormatVersion: apigwv2.PayloadFormatVersion.VERSION_1_0, // THIS IS GRUCIAL NOTHING WORKS OTHERWISE
      }
    ),
  });
};
