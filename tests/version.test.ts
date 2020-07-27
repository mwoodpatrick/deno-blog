import { assert } from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "checking deno version",
  fn(): void {
    let version: string = Deno.env.get("DENO_VERSION") || "";

    if (version) {
      // format: deno <version number e.g. 1.2.0?
      const words = version.split(" ");
      version = words[1];
    }
    console.log(`running deno version: ${version}`);
    assert(parseInt(version) >= 1);
  },
});