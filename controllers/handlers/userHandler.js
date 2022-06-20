const User = require("../../models/user")
const generateToken = require("../../helpers/generateTokens")

const SignUp = async (req, reply) => {
  console.log(req.body)
  const { firstName, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    return reply.code(404).send({ message: "User already exists" })
  }
  const user = await User.create({ firstName, email, password })
  console.log(user)
  if (user) {
    reply.code(201).send({
      message: "User created successfully",
      UserDate: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        token: generateToken(user._id),
      },
    })
  } else {
    console.log("error while creating".bgRed)
    return reply.code(404).send({
      error: "Status failed",
      message: "Failed to create user into database",
      statusCode: 404,
    })
  }
}

const SignIn = async (req, res) => {
  const { email, password } = req.body
  let userData = await User.findOne({ email })
  if (!userData) {
    return res.status(400).json({
      error: "User not exists",
    })
  }
  if (!userData.autheticate(password)) {
    return res.code(401).send({
      error: "Email and password do not match",
    })
  }

  console.log(userData)
  const token = generateToken(userData._id)
  const { _id, firstName, pic } = userData
  return res.send({ token, user: { _id, firstName, email, pic } })
}

const changePassword = async (req, reply) => {
  const { actPassword, password, conformPassword } = req.body

  User.securePassword()
}

//TODO:Get self user data for profile

const getLoggedInUserData = async (req, reply) => {
  try {
    let user = await User.findOne({ _id: req.user._id }).select("-Password")

    console.log(user)
    return reply.code(200).send(user)
  } catch (err) {
    console.log(err)
    return reply.code(404).send({ message: "Failed to get user data" })
  }
}

//TODO:"Delete self account"

module.exports = { SignUp, SignIn, getLoggedInUserData }
