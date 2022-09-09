const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const usersRouter = require("express").Router();

usersRouter.post("/register", async (request, response) => {
  
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    response.status(400);
    throw new Error("Sorry, this email is already registered");
  }

  const hashedPassword = await hashPassword(password, 10);

  const newUserCredentials = {
    email,
    password: hashedPassword,
  };

  const newUser = await User.create(newUserCredentials);

  response.status(201).json({
    token: generateToken(newUser._id),
  });
});

usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body

  const existingUser = await User.findOne({email})

  if(!existingUser){
    response.status(400)
    throw new Error ('Invalid user')
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password)

  if(!passwordMatch){
    response.status(400)
    throw new Error('Invalid password')
  }

  const token = generateToken(existingUser._id)

  if(!token) {
    response.status(400)
    throw new Error('Ops! Something went wrong, please try to login again.')
  }

  response.status(200).json({token})
})

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET);
};

const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

module.exports = usersRouter;
