import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import { decodeCognitoToken } from "./middlewares/cognito-token.middleware";

const app = new Koa();
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(cors());
app.use(decodeCognitoToken);

// app.use(async (ctx) => {
//   ctx.body = "Welcome to the server side";
// });

export { app };
