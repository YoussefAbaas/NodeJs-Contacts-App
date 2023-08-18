const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add user name"],
    },
    email: {
      type: String,
      required: [true, "please add user email"],
      unique: [true, "please choose not used email "],
    },
    password: {
      type: String,
      required: [true, "please add user password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
