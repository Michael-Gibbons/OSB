import dotenv from 'dotenv'
dotenv.config()

const isProd = process.env.NODE_ENV === "production"
const PROD_INDEX_PATH = `${process.cwd()}/../frontend/dist/`;

export default async function applyProductionMiddleware(app){
  if(isProd){
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    app.use(compression());
    app.use(serveStatic(PROD_INDEX_PATH, { index: false }));
  }
}