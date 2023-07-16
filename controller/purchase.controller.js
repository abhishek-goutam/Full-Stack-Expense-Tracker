const Razorpay = require("razorpay");
const Order = require("../model/orders");

const purchasePremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: "rzp_test_gbMlReD4lA96rI",
      key_secret: "pLjizrySX3CH2uZNuAGlknJ8",
    });

    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (error) {
    res.status(403).json({ message: "Something went wrong", error: error });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    Order.findOne({ where: { orderid: order_id } })
      .then((order) => {
        order
          .update({ paymentid: payment_id, status: "SUCCESSFUL" })
          .then(() => {
            req.user
              .update({ ispremiumuser: true })
              .then(() => {
                return res
                  .status(202)
                  .json({ success: true, message: "Transaction Successful" });
              })
              .catch((err) => {
                throw new Error(err);
              });
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {}
};

module.exports = {
  purchasePremium,
  updateTransactionStatus,
};
