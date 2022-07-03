const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        const regex =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value.match(regex);
      },
      message: "Please Enter a valid Email Address",
    },
  },

  password: {
    required: true,
    type: String,
  },

  address: {
    default: "",
    type: String,
  },

  type: {
    default: "user",
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
