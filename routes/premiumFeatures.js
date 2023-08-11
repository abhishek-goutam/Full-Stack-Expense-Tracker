const express = require("express");

const premiumFeatureController = require("../controller/premiumFeature");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.get(
  "/showLeaderBoard",
  authenticate.authenticate,
  premiumFeatureController.getUserLeaderBoard
);

module.exports = router;
