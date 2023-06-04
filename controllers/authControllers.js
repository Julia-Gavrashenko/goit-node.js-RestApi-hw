const { User } = require("../models/userMongooseSchema");
const { HttpError, asyncWrapper } = require("../utils");
// const { asyncWrapper } = require("../utils");


const register = asyncWrapper(async (req, res, next) => {
  const newUser = await User.create(req.body)
  
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
});


module.exports = {
  register,
};
