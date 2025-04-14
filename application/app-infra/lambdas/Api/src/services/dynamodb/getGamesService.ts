import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { GAMES_TABLE, GAMES_TABLE_GSI_CATEGORY } from "../../constants";
import { docClient } from "../../instances/aws";

export const getGamesService = async (categoryId: string) => {
  const command = {
    TableName: GAMES_TABLE,
    IndexName: GAMES_TABLE_GSI_CATEGORY,
    KeyConditionExpression: "categoryId = :categoryId",
    ExpressionAttributeValues: {
      ":categoryId": categoryId,
    },
  };
  const response = await docClient.send(new QueryCommand(command));
  return response.Items;
};
