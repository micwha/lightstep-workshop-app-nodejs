const { delay, response } = require("./helpers/helpers");

const process_payment = async (order_id, payment_info) => {
  try {
    console.log(
      `Processing payment for Order ${order_id} with type = ${payment_info.payment_type} expiring on ${payment_info.exp}`
    );
    if (payment_info.payment_type != "CREDIT_CARD") {
      return response(
        400,
        "Only credit card payments are accepted at this time"
      );
    }

    if (isNaN(parseInt(payment_info.cc_no))) {
      return response(400, "Invalid credit card number");
    }

    await delay();

    return response(200, "Payment processed successfully");
  } catch (error) {
    return response(500, error);
  }
};

module.exports = { process_payment };
