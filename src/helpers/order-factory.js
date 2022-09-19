const { faker } = require("@faker-js/faker");

const create_order = () => {
  const cust_name = faker.name.fullName();
  const cust_addr = create_address();
  let order_total = 0;

  const order = {
    order_id: faker.datatype.uuid(),
    order_total: 0,
    order_items: [],
    shipping_info: create_shipping_info(cust_name, cust_addr),
    payment_info: create_payment_info(cust_name, cust_addr),
  };

  const num_items = faker.random.numeric();
  for (i = 1; i <= num_items; i++) {
    const item = create_order_item();
    order.order_items.push(item);
    order_total += item.total_cost;
  }

  order_total += order.shipping_info.shipping_cost;
  order.order_total = Number(order_total.toFixed(2));
  return order;
};

const create_order_item = () => {
  const sku = `prod-${faker.random.alphaNumeric(8)}`;
  const prod_name = faker.commerce.productName();
  const unit_price = Number(
    parseFloat(faker.finance.amount(5, 200, 2)).toFixed(2)
  );
  const units = parseInt(faker.random.numeric());
  const total_cost = unit_price * units;

  return {
    product_name: prod_name,
    sku: sku,
    units: units,
    unit_price: unit_price,
    total_cost: total_cost,
  };
};

const create_address = () => {
  const cust_city = faker.address.city();
  const cust_street = faker.address.streetAddress();
  const cust_state = faker.address.stateAbbr();
  const cust_postal_code = faker.address.zipCodeByState(cust_state);

  return {
    street_addr: cust_street,
    city: cust_city,
    state_code: cust_state,
    country_code: "USA",
    postal_code: cust_postal_code,
  };
};

const create_shipping_info = (cust_name, addr) => {
  const shipping_carriers = ["UPS", "FedEx", "DHL"];
  const shipping_methods = ["GROUND", "PRIORITY", "OVERNIGHT"];

  return {
    shipping_address: {
      ship_to: cust_name,
      street_addr: addr.street_addr,
      city: addr.city,
      state_code: addr.state_code,
      country_code: addr.country_code,
      postal_code: addr.postal_code,
    },
    shipping_method: faker.helpers.arrayElement(shipping_methods),
    carrier: faker.helpers.arrayElement(shipping_carriers),
    shipping_cost: Number(
      parseFloat(faker.finance.amount(10, 100, 2)).toFixed(2)
    ),
  };
};

const create_payment_info = (cust_name, addr) => {
  const current_date = new Date();
  const current_yr = current_date.getFullYear();
  const exp_date = faker.date.between(
    current_date.setFullYear(current_yr - 1),
    current_date.setFullYear(current_yr + 6)
  );
  const exp_month = exp_date.getMonth();
  const exp_year = exp_date.getFullYear() - 2000;
  const cvv = faker.finance.creditCardCVV();

  return {
    payment_type: "CREDIT_CARD",
    cc_no: faker.finance.creditCardNumber(),
    exp: `${exp_month}/${exp_year}`,
    cvv: cvv,
    billing_name: cust_name,
    billing_address: addr,
  };
};

module.exports = { create_order };
