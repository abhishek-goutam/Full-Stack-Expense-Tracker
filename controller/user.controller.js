const User = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isStringValid(string) {
  if (string === undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

function generateAccessToken(id) {
  return jwt.sign(
    { userId: id },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
}
module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const usersData = await User.findAll();
      //   console.log("user data -->", usersData);
      res.send(usersData);
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (isStringValid(email) || isStringValid(password)) {
        return res
          .status(400)
          .json(
            { success: false, message: "Email or password missing" },
            "secretkey"
          );
      }
      const user = await User.findAll({ where: { email: email } });

      console.log("user data", user[0].password);
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) {
            throw new Error("something went wrong");
          }
          if (result == true) {
            return res
              .status(200)
              .json({ success: true, message: "User logged in successfully",token:generateAccessToken(user[0].id) });
          } else {
            return res
              .status(400)
              .json({ success: false, message: "password is incorrect" });
          }
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "USer does not exist" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  },
  signUp: async (req, res) => {
    try {
      const { email, name, password } = req.body;

      if (isStringValid(email) || isStringValid(name)) {
        return res
          .status(400)
          .json({ err: "Bad parameters: Something missing" });
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        await User.create({ name, email, password: hash});
        res.status(201).json({ message: "Successfully created new user" });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
