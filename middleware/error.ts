import { isHttpError, Status } from "../deps.ts";

import between from "../helpers/between.ts";

export default async (ctx: any, next: any) => {
  try {
    await next();

    const status = ctx.response.status || Status.NotFound;

    if (status === Status.NotFound) {
      ctx.throw(Status.NotFound, "Not Found!");
    }
  } catch (err) {
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    console.dir(ctx.request);
    console.dir(err);

    const status = isHttpError(err) ? err.status : 500;

    ctx.response.status = status;
    ctx.response.type = "json";
    ctx.response.body = {
      status: between(status, 400, 500) ? "fail" : "error",
      message: err.message,
      success: false,
    };
  }
};
