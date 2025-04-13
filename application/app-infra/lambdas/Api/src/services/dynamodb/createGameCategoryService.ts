import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { GAME_CATEGORIES_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const createGameCategoryService = async (category: any) => {
  const command = {
    TableName: GAME_CATEGORIES_TABLE,
    Item: category,
  };
  await docClient.send(new PutCommand(command));
};
