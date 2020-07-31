import { App, logger } from "https://deno.land/x/attain/mod.ts";
import { Session } from "https://deno.land/x/session/mod.ts";

const app = new App();

const session = new Session({ framework: "attain" })
await session.init();

app.use(logger);
app.use(session.use()(session)); // able to add options at second params

app.use("/", async (req, res) => {
  // Examples of getting and setting variables on a session
  if (await req.session.get("pageCount") === undefined) {
    await req.session.set("pageCount", 0);
  } else {
    await req.session.set("pageCount", await req.session.get("pageCount") + 1);
  }
  res.status(200).send(`Visited page ${await req.session.get("pageCount")} times`)
});

console.log("Server at http://localhost:8080");
await app.listen({ port: 8080 });