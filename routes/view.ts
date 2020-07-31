import { Router, Status, engineFactory } from "../deps.ts";

const router = new Router();
const handlebarsEngine = engineFactory.getHandlebarsEngine();

router.get("/view.html", async (ctx) => {
  const template = `
<html>
    <h1>This is a title</h1>
    <body>
        My name is {{data.name}}
    </body>
</html>`;
//        You have visted this page {{data.pageCount}} times

  // Examples of getting and setting variables on a session
//  if (await ctx.state.session.get("pageCount") === undefined) {
//    await ctx.state.session.set("pageCount", 0);
//  } else {
//    await ctx.state.session.set(
//      "pageCount",
//      await ctx.state.session.get("pageCount") + 1,
 //   );
 // }

  ctx.response.status = Status.OK;
  ctx.response.type = "html";
  ctx.response.body = handlebarsEngine(
    template,
    {
      data: {
        name: "John",
        pageCount: 0
        // pageCount: await ctx.state.session.get("pageCount"),
      },
    },
  );
});

router.get("/view", (ctx) => {
  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    message: "Bonjour mon ami",
    name: "John",
  };
});

export default router;