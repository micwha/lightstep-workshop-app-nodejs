const { delay, response } = require("./helpers/helpers");

const ship_order = async (order_id, shipping_info) => {
  try {
    console.log(`Shipping Order ${order_id}`);
    await delay();

    const msg =
      `Shipping label generated for Order ${order_id}.\n` +
      `Shipping to ${shipping_info.shipping_address.ship_to} ` +
      `via ${shipping_info.carrier} ${shipping_info.shipping_method}`;
    return response(200, msg);
  } catch (error) {
    return response(500, error);
  }
};

module.exports = { ship_order };
