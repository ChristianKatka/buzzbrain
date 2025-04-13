import { Context } from "koa";

export const createGameCategoryController = async (
  ctx: Context
): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;

  ctx.body = {};
};
