import app from "../app.ts";

const env = Deno.env.toObject();

const HOST = env.HOST||"127.0.0.1";
const PORT  = Number(env.PORT) || 3000;
const SECURE = !!env.SECURE||false;
const CERT_FILE = env.CERT_FILE||"";
const KEY_FILE = env.KEY_FILE||"";
const PROTOCOL = SECURE ? "https" : "http";

const listenOptions = {
    port: Number(PORT),
    secure: SECURE, 
    certFile : CERT_FILE, 
    keyFile: KEY_FILE
};

console.log(`app running -> ${PROTOCOL}://${HOST}:${PORT}`);
console.dir(listenOptions);

await app.listen(listenOptions);