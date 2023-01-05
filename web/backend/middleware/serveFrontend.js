import dotenv from 'dotenv'
dotenv.config()

import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProd = process.env.NODE_ENV === "production"
const DEV_INDEX_PATH = path.join(__dirname, '..', '..', 'frontend')
const PROD_INDEX_PATH = path.join(__dirname, '..', '..', 'frontend', 'dist')

export default async function serveFrontend(req, res, next){
  const htmlFile = path.join(
    isProd ? PROD_INDEX_PATH : DEV_INDEX_PATH,
    "index.html"
  );

  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(htmlFile));
}