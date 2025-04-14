import { Context } from "koa";
import { getGamesService } from "../services/dynamodb/getGamesService";

export const getGamesController = async (ctx: Context): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;
  const { gameCategory } = ctx.params;

  const games = await getGamesService(gameCategory);

  ctx.body = games;
};
