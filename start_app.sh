# export DENO_DIR=/home/mwoodpatrick/projects/git/deno/deno_cache
export DENO_DIR=`pwd`/deno_cache
export DB_HOST=127.0.0.1
export DB_USER=root
export DB_DATABASE=denoblog
export DB_PASSWORD=""
export TOKEN_SECRET=QA3GCPvnNO3e6x29dFfzbvIlP8pRNwif

# denon run  -A --importmap=importmap.json --unstable app.ts

# strace 
deno run --unstable --allow-net --allow-env --allow-read bin/server.ts  2>&1 | tee build_log/`date +"%m_%d_%y__%H%M"`.log