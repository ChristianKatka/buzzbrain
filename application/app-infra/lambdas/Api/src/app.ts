import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import { decodeCognitoToken } from "./middlewares/cognito-token.middleware";
import { router } from "./routers/router";

const app = new Koa();
app.use(cors());
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(decodeCognitoToken);
app.use(router.routes()).use(router.allowedMethods());

export { app };
