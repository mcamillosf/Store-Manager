const convert = (body) => {
  const result = body.map((each) => ({
   id: each.product_id,
   quantity: each.quantity,
 }));
 
 return result;
};

module.exports = convert;