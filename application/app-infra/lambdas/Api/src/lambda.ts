// import * as awsServerlessExpress from "aws-serverless-express";
// import { app } from "./app";

// const server = awsServerlessExpress.createServer(app.callback());

// export const handler = (event, context) => {
//   return awsServerlessExpress.proxy(server, event, context);
// };

import serverlessExpress from "@codegenie/serverless-express";
import { app } from "./app";

const options = {
  app: app.callback(),
};

const handler = serverlessExpress(options);

export { handler };
