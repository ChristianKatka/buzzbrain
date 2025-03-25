import { aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export const createRoleAndPolicies = (stack: Construct) => {
  // Create IAM Role for Lambda
  const lambdaExecutionRole = new iam.Role(stack, "LambdaExecutionRole", {
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
  });

  // Allow CloudWatch Logs
  lambdaExecutionRole.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
      ],
      resources: ["arn:aws:logs:*:*:*"],
    })
  );

  // Allow access to Cognito
  lambdaExecutionRole.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["cognito-idp:*"],
      resources: ["*"],
    })
  );
};
