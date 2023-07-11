const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/users", userController.getAllUsers);

router.post("/login", userController.login);

router.post("/signUp", userController.signUp);

module.exports = router;
       