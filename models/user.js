const mongoose = require("mongoose")
const crypto = require("crypto")
const { v1: uuidv1 } = require("uuid")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: "String",
      required: true,
      trim: true,
    },
    lastName: {
      type: "String",
      trim: true,
    },
    email: {
      type: "String",
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: "String",
      required: true,
    },
    salt: "String",
    pic: {
      type: "String",
      default:
        "https://prasarbharati.gov.in/wp-content/uploads/2021/01/unnamed.jpg",
    },
  },
  { timestamps: true }
)

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.Password = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.Password
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return ""
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex")
    } catch (err) {
      return ""
    }
  },
}

module.exports = mongoose.model("User", userSchema)
