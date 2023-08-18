const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please add contact name"],
    },
    telephone: {
      type: String,
      required: [true, "please add contact phone"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacts", contactSchema);
