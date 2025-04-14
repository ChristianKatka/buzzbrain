import { Context } from "koa";
import { createGameCategoryService } from "../services/dynamodb/createGameCategoryService";

export const createGameCategoryController = async (
  ctx: Context
): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;
  const body = ctx.request.body;
  await createGameCategoryService(body);
  ctx.body = body;
};
