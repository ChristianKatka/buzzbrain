import Router from "koa-router";
import { createGameCategoryController } from "../controllers/createGameCategoryController";
import { createGameController } from "../controllers/createGameController";
import { getGameCategoriesController } from "../controllers/getGameCategoriesController";
import { getGamesController } from "../controllers/getGamesController";

export const router = new Router({
  // prefix: "",
});

router.get("/game-categories", getGameCategoriesController);
router.post("/game-category", createGameCategoryController);

router.get("/games/:categoryId", getGamesController);
router.post("/game", createGameController);
