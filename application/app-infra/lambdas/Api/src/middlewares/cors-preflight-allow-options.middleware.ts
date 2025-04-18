import { Context, Next } from "koa";

export const corsPreflightAllowOptions = async (ctx: Context, next: Next) => {
  // other wise cors error. and options are required for api gateway cognito authorizer integration

  if (ctx.method === "OPTIONS") {
    ctx.status = 204;
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    ctx.set("Access-Control-Allow-Headers", "*");
  } else {
    await next();
  }
};
