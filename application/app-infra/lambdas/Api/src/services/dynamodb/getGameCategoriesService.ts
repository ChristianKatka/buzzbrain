import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { GAME_CATEGORIES_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const getGameCategoriesService = async () => {
  const command = {
    TableName: GAME_CATEGORIES_TABLE,
  };

  const response = await docClient.send(new ScanCommand(command));
  return response.Items;
};
