const User = require("../../models/user")
const generateToken = require("../../helpers/generateTokens")

const SignUp = async (req, reply) => {
  const user = await User.create({ ...req.body })
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

const SignIn = async (req, reply) => {
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err !== null) {
      return reply.code(404).json({ message: "Failed to login user" })
    }
    if (!user.autheticate(password)) {
      return reply.code(404).json({ message: "Email and password not matches" })
    }
    const token = generateToken(user._id)
    reply.header("set-cookie", token)

    return res.code(200).json({ token, user: { _id, firstName, email } })
  })
}

//TODO:Get self user data for profile

//TODO:"Delete self account"

module.exports = { SignUp, SignIn }
