const express = require("express");
const router = express.Router();

const purchaseCOntroller = require("../controller/purchase.controller");

const authenticate = require("../middleware/auth");

router.get(
  "/premiummembership",
  authenticate.authenticate,
  purchaseCOntroller.purchasePremium
);

router.post(
  "/updatetransaction,",
  authenticate.authenticate,
  purchaseCOntroller.updateTransactionStatus
);

module.exports = router;