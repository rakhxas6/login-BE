import jwt from "jsonwebtoken";
import ENV from "../config.js";
// auth middlewares
export default async function Auth(req, res, next) {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    //retrive the user details fot the logged in user
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

    req.user = decodedToken;

    next();
    // access authorize header to validate request
  } catch (error) {
    res.status(401).json({ error: " Authentication Failed!" });
  }
}

export function localVariables(res, req, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
