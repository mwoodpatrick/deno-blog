import { fromFileUrl } from "https://deno.land/std/path/posix.ts";
import { CHAR_FORM_FEED } from "./deno_cache/deps/https/deno.land/deca9362afe2080ad38d09cee2792ec9c8b8acc7ed9b0ceeee1049a441ad0dd4"

let u: URL = new URL("");

console.log(fromFileUrl(u));