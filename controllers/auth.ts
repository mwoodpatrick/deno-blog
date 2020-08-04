import { Status, compare, makeJwt, Jose, Payload } from "../deps.ts";

import User from "../models/User.ts";

export async function register(ctx: any) {
  const result = ctx.request.body({
    contentTypes: {
      text: ["application/json"],
    },
  });
  
  const body = await result.value;
  const user = await User.findByEmail(body.email);

  if (user) {
    ctx.throw(Status.Conflict, `Email Address ${body.email} Already Taken!`);
  }

  const { userId, userCount } = await User.create(body);

  ctx.response.status = Status.Created;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${userCount} user registered in database`,
    data: {
      user: {
        id: userId,
      },
    },
  };
}

export async function login(ctx: any) {
  const result = ctx.request.body({
    contentTypes: {
      text: ["application/json"],
    },
  });

  const body = await result.value;

  const user = await User.findByEmail(body.email);

  if (!user) {
    ctx.throw(Status.UnprocessableEntity, "Wrong Email Address!");
  } else if (await compare(body.password, user.password)) {
    const header: Jose = { alg: "HS256", typ: "JWT" };
    const payload: Payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const key: string = Deno.env.get("TOKEN_SECRET") ||
      "H3EgqdTJ1SqtOekMQXxwufbo2iPpu89O";

    const token = await makeJwt({ header, payload, key });

    ctx.response.status = Status.OK;
    ctx.response.type = "json";
    ctx.response.body = {
      status: "success",
      message: `Logged in with ${body.email}`,
      data: { accessToken: token },
    };
  } else {
    ctx.throw(Status.Unauthorized, "Wrong Password!");
  }
}
