import { Context } from "koa";
import { getGamesService } from "../services/dynamodb/getGamesService";

export const getGamesController = async (ctx: Context): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;
  const { categoryId } = ctx.params;

  const games = await getGamesService(categoryId);

  ctx.body = games;
};
