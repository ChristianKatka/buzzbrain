import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpJwtAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration, aws_lambda as lambda } from "aws-cdk-lib";
import { Construct } from "constructs";

export const createHttpApiGateWay = (
  stack: Construct,
  apiFunction: NodejsFunction,
  jwtAuthorizer: HttpJwtAuthorizer
) => {
  // Create the HTTP API
  const httpApi = new apigwv2.HttpApi(stack, "ApiGatewayHttpApi", {
    apiName: "Api",
    corsPreflight: {
      allowOrigins: ["*"], // or your domain
      allowMethods: [apigwv2.CorsHttpMethod.ANY],
      allowHeaders: ["*"],
      maxAge: Duration.seconds(60),
    },
    defaultIntegration: new integrations.HttpLambdaIntegration(
      "DefaultIntegration",
      apiFunction
    ),
  });

  // Manually define OPTIONS route for CORS preflight (especially needed if Cognito authorizer is used)
  httpApi.addRoutes({
    path: "/{proxy+}",
    methods: [apigwv2.HttpMethod.OPTIONS],
    integration: new integrations.HttpLambdaIntegration(
      "PreflightIntegration",
      apiFunction
    ),
  });
};

// WORKING KINDA BUT NOT

// new apigwv2.HttpApi(stack, "Api", {
//   corsPreflight: {
//     allowOrigins: ["*"],
//     allowHeaders: ["*"],
//     allowMethods: [
//       apigwv2.CorsHttpMethod.GET,
//       apigwv2.CorsHttpMethod.POST,
//       apigwv2.CorsHttpMethod.OPTIONS,
//     ],
//     maxAge: Duration.seconds(60),
//   },
//   defaultAuthorizer: jwtAuthorizer,
//   defaultIntegration: new integrations.HttpLambdaIntegration(
//     "DefaultIntegration",
//     apiFunction,
//     {
//       payloadFormatVersion: apigwv2.PayloadFormatVersion.VERSION_1_0, // THIS IS GRUCIAL NOTHING WORKS OTHERWISE
//     }
//   ),
// });
