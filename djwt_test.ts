// based on https://www.geekyhacker.com/2020/06/03/generate-and-validate-jwt-in-deno/
import {
  validateJwt,
  Jose,
  Payload,
} from "https://deno.land/x/djwt@v1.2/validate.ts";
import {
  makeJwt,
  setExpiration,
} from "https://deno.land/x/djwt@v1.2/create.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const expirationMinute = 10;

const key = "dummy_key";

const getTokenExpirationAsMilliseconds = () => {
  return new Date().getTime() + expirationMinute * 60 * 1000;
};

const payload = {
  iss: "dummy_issuer",
  exp: setExpiration(getTokenExpirationAsMilliseconds()),
};

// const header = { alg: "HS256", typ: "JWT", };

const header: Jose = { alg: "HS256", typ: "JWT" };

const generateToken = () => {
  return makeJwt({ key, header, payload });
};

const validateToken = (jwt: string) => {
  return validateJwt({ jwt, key, critHandlers: undefined, algorithm: "HS256" });
};

const router = new Router();

const app = new Application();

router
  .get("/generate", async (context) => {
    const t = await generateToken();
    console.log(`generated token: ${t} after token`);
    context.response.body = { token: t };
  })
  .post("/validate", async (context) => {
    const result = context.request.body();
    const body = await result.value;
    const v = await validateToken(body.token);

    console.log(`got validity ${v}`);

    context.response.body = { isValid: v.isValid  };
  });

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8080 });
