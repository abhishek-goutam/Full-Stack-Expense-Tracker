const User = require("../model/users.model");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const user = jwt.verify(
      token,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );

    console.log("---->>>><<<<<<", user.userId);
    User.findByPk(user.userId)
      .then((user) => {
        console.log("**********", JSON.stringify(user));
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false });
  }
};

module.exports = { authenticate };
