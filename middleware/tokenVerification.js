const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;
const tokenVerification = (req, res, next) => {
  try {
    //check headers
    let token = req.headers.authorization;
    if (!token) {
      return next({
        status: 400,
        message: "Authorization Headers are missing!",
      });
    }
    //verify token
    token = token.split(" ")[1];
    const user = jwt.verify(token, secretKey);
    if (!user) {
      return next({
        status: 400,
        message: "Wrong or expired token",
      });
    }
    //set id
    req.id = user.id;
    next();
  } catch (error) {
    if (error.name === jwt.JsonWebTokenError.name) {
      error.status = 401;
    }
    next({ status: error.status, message: error.message });
  }
};

module.exports = tokenVerification;
