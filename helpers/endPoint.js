const jwt = require("jsonwebtoken")

const User = require("../models/user")

const endPoint = async (req, reply, next) => {
  console.log("Here")
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedToken._id).select("-Password")
      next()
    } catch (err) {
      console.log(error)
      return reply.code(401).json({ error: "Not authorized try again" })
    }
  } else {
    return reply.code(403).json({ error: `UnAuthorised` })
  }
}

module.exports = endPoint
