import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export const createUserDataDynamoTable = (
  stack: Construct,
  envName: string
) => {
  const tableName = `${envName}-user-data`;
  const table = new dynamodb.Table(stack, "UserDataTable", {
    tableName,
    partitionKey: {
      name: "email",
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });

  return table;
};
