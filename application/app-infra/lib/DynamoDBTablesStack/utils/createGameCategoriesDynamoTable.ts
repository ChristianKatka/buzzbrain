import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export const createGameCategoriesDynamoTable = (
  stack: Construct,
  envName: string
) => {
  const tableName = `${envName}-game-categories`;
  const table = new dynamodb.Table(stack, "GameCategoriesTable", {
    tableName,
    partitionKey: {
      name: "categoryId",
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });

  return table;
};
