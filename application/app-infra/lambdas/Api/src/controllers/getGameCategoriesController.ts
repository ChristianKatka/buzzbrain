import { Context } from "koa";

export const getGameCategoriesController = async (
  ctx: Context
): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;

  ctx.body = {};
};
