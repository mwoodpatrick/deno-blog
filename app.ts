import { Application } from "./deps.ts";
// import { Session } from "https://deno.land/x/session/mod.ts";

import error from "./middleware/error.ts";
import logger from "./middleware/logger.ts";
import timer from "./middleware/timer.ts";

import home from "./routes/home.ts";
import view from "./routes/view.ts";
import blogs from "./routes/blogs.ts";
import auth from "./routes/auth.ts";

const app = new Application();

// Configuring Session for the Oak framework
// const session = new Session({ framework: "oak" });
// await session.init();

app.use(error);
app.use(logger);
app.use(timer);

// Adding the Session middleware. Now every context will include a property
// called session that you can use the get and set functions on
// app.use(session.use()(session));

app.use(home.routes())
  .use(view.routes())
  .use(blogs.routes())
  .use(auth.routes());

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

export default app;