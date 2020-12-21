#!/bin/bash
docker-compose up -d
export PORT=3004
export AUTO_INDEX=true
export MONGODB_URI=mongodb://localhost:27017/cz-crawl-data
npm run dev
# npm run start
