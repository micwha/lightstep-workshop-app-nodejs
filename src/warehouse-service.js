const { delay, response } = require("./helpers/helpers");

const pick_order = async (order_id, order_items) => {
  try {
    console.log(`Picking order items for Order ${order_id}`);

    for (const item of order_items) {
      let inv_resp = await update_inventory(item);
    }
    return response(200, "Order items picked and ready for shipping");
  } catch (error) {
    return response(500, error);
  }
};

const update_inventory = async (order_item) => {
  try {
    console.log(`Updating inventory for SKU ${order_item.sku}`);
    await delay(1000);
    return response(200, `Inventory levels updated for SKU ${order_item.sku}`);
  } catch (error) {
    return response(500, error);
  }
};

module.exports = { pick_order };
