import { Status } from "../deps.ts";

import Blog from "../models/Blog.ts";

export async function index(ctx: any) {
  const blogs = await Blog.all();

  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${blogs?.length} blogs found in database`,
    data: { blogs },
  };
}

export async function store(ctx: any) {
  const result = ctx.request.body({
    contentTypes: {
      text: ["application/json"],
    },
  });

  const body = await result.value;

  const { blogId, blogCount } = await Blog.create(body);

  ctx.response.status = Status.Created;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${blogCount} blog created in database`,
    data: {
      blog: {
        id: blogId,
      },
    },
  };
}

export async function show(ctx: any) {
  const blog = await Blog.findBySlug(ctx.params.slug);

  if (!blog) {
    ctx.throw(Status.NotFound, `Blog ${ctx.params.slug} Not Found!`);
  }

  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `Blog with slug ${ctx.params.slug}`,
    data: { blog },
  };
}

export async function update(ctx: any) {
  const blog: any = await Blog.findBySlug(ctx.params.slug);

  if (!blog) {
    ctx.throw(Status.NotFound, `Blog ${ctx.params.slug} Not Found!`);
  }

  const body = await ctx.request.body();

  blog.title = body.value["title"] ? body.value["title"] : blog.title;
  blog.content = body.value["content"] ? body.value["content"] : blog.content;
  blog.save();

  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `Blog with slug ${ctx.params.slug} updated`,
    data: { blog },
  };
}

export async function destroy(ctx: any) {
  const blog: any = await Blog.findBySlug(ctx.params.slug);

  if (!blog) {
    ctx.throw(Status.NotFound, `Blog ${ctx.params.slug} Not Found!`);
  }

  blog.delete();

  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `Blog with slug ${ctx.params.slug} deleted`,
    data: null,
  };
}
