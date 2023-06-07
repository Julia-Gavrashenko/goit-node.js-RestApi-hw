const { User } = require("../models/userMongooseSchema");
const { HttpError, asyncWrapper } = require("../utils");
// const { asyncWrapper } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, "Email should be unique");
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password invalid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });


  res.json({
    token,
  })
});

const getCurrent = asyncWrapper(async (req, res, next) => {
    const { email, name } = req.user;
  res.json({ email, name});
  })


module.exports = {
  register,
  login,
  getCurrent,
};
