const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils/");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },

    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: "",
    },

    avatarURL: {
      type: String,
      required: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
     required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    //   collection: "users"
  }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = { User };
