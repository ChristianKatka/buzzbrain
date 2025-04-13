import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { GAMES_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const createGameService = async (game: any) => {
  const command = {
    TableName: GAMES_TABLE,
    Item: game,
  };
  await docClient.send(new PutCommand(command));
};
