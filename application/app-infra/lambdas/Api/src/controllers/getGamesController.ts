import { Context } from "koa";

export const getGamesController = async (ctx: Context): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;

  ctx.body = {};
};
