const Razorpay = require("razorpay");
const Order = require("../model/orders");
const userController = require("./user.controller");

const purchasePremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });


    // const amount = 2500;
    var options = {
      amount: 2500,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    rzp.orders.create(options, (err, order) => {  
      if (err) {
        console.log("inside create order",order)
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
    console.log("request body ", req.body);
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.update({ ispremiumuser: true });

    Promise.all([promise1, promise2]).then((value) => {
      // console.log("resolved promise", value[1].ispremiumuser);
      return res
        .status(202)
        .json({
          success: true,
          message: "Transaction Successful",
          token: userController.generateAccessToken(
            value.userId,
            undefined,
            true
          ),
          ispremiumuser:value[1].ispremiumuser
        });
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  purchasePremium,
  updateTransactionStatus,
};
