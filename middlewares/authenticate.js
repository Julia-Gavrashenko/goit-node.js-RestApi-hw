const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const { User } = require("../models/userMongooseSchema");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(new HttpError(401));
  }
};

module.exports = authenticate;
