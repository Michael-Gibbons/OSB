import dotenv from 'dotenv'
dotenv.config()

export default async (req, res, next) => {
  if (typeof req.query.shop !== "string") {
    res.status(500);
    return res.send("No shop provided");
  }

  return next()
}