const { process_payment } = require("./payment-service");
const { pick_order } = require("./warehouse-service");
const { ship_order } = require("./shipping-service");
const { create_order } = require("./helpers/order-factory");

async function place_order(order) {
  console.log(`Placing Order ${order.order_id}`);

  const pmt_resp = await process_payment(order.order_id, order.payment_info);
  if (pmt_resp.status_code != 200) {
    log_error(pmt_resp.message);
    return;
  }

  const wh_resp = await pick_order(order.order_id, order.order_items);
  if (wh_resp.status_code != 200) {
    log_error(wh_resp.message);
    return;
  }

  const ship_resp = await ship_order(order.order_id, order.shipping_info);
  if (ship_resp.status_code != 200) {
    log_error(ship_resp.message);
    return;
  }
  console.log(`Order ${order.order_id} placed successfully`);
}

const log_error = (error) => {
  console.log(`Order was not placed successfully. ERROR: ${error}`);
};

place_order(create_order());
