import { ClientConfig, Client } from "../deps.ts";

console.log("Creating Database connection");

const config:ClientConfig = {
  hostname: Deno.env.get("DB_HOST"),
  username: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
  db: Deno.env.get("DB_DATABASE"),
};

const client = await new Client().connect(config);

console.log("Created Database connection");

export default client;
