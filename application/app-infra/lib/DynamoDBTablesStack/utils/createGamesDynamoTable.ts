import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export const createGamesDynamoTable = (stack: Construct, envName: string) => {
  const tableName = `${envName}-games`;
  const table = new dynamodb.Table(stack, "GamesTable", {
    tableName,
    partitionKey: {
      name: "gameId",
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });

  table.addGlobalSecondaryIndex({
    indexName: "GSI_Category",
    partitionKey: {
      name: "categoryId",
      type: dynamodb.AttributeType.STRING,
    },
    projectionType: dynamodb.ProjectionType.ALL,
  });

  return table;
};
