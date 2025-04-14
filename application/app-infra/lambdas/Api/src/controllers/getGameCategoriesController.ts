import { Context } from "koa";
import { getGameCategoriesService } from "../services/dynamodb/getGameCategoriesService";

export const getGameCategoriesController = async (
  ctx: Context
): Promise<void> => {
  const { sub, email } = ctx.state.jwtPayload;
  // const { projectId } = ctx.params;
  const userId = ctx.state.jwtPayload.sub;
  const body = ctx.request.body;

  const gameCategories = await getGameCategoriesService();

  ctx.body = gameCategories;
};
