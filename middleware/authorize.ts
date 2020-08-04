import { Status, validateJwt } from "../deps.ts";

export default async (ctx: any, next: any) => {
  const authHeader = ctx.request.headers.get("authorization");

  if (!authHeader) {
    ctx.throw(Status.Unauthorized, "Access Token Missing!");
  } else {
    const jwt: string = authHeader.split(" ")[1];

    try {
      const key: string = Deno.env.get("TOKEN_SECRET") ||
        "H3EgqdTJ1SqtOekMQXxwufbo2iPpu89O";

     
      const v = await validateJwt({jwt, key, critHandlers:undefined, algorithm: "HS256"});

      if (v.isValid) {
        ctx.request.user = v.payload;
      }
      else {
        console.log(`invalid user: ${v}`);
        ctx.throw(Status.Unauthorized);
      }

      await next();
    } catch (err) {
      throw(err);
    }
  }
};
