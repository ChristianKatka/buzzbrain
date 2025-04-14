import { Context } from "koa";
import { createGameService } from "../services/dynamodb/createGameService";

export const createGameController = async (ctx: Context): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;
  const body = ctx.request.body;
  await createGameService(body);
  ctx.body = body;
};
