const User = require("../model/users.model");
const path = require("path");
function isStringValid(string) {
  if (string === undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
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
        res
          .status(400)
          .json({ success: false, message: "user Logged in successfull" });
      }
      const user = await User.findAll({ where: { email: email } });
      if (user.length > 0) {
        if (user[0].password === password) {
          res
            .status(200)
            .json({ success: true, message: "user Logged in successfull" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Password Incorrect" });
        }
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User does not exist" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  },
};
