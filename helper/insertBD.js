const salesService = require('../services/salesService');
const productService = require('../services/productService');

const handleFunction = async (id, body) => {
  await Promise.all(body.map(async (each) => {
    await salesService.create(id, each.product_id, each.quantity);
    await productService.updateQtProd(each.product_id, each.quantity);
  }));
};

// Peguei com o Rafael Janovicci
const handleUpdateFunction = async (id, body) => {
  const updated = await Promise.all(body.map(async (each) => {
    const getProd = await productService.getById(each.product_id);
    const stockQt = getProd.quantity;
    if (each.quantity > stockQt) return true;
    await salesService.update(id, each.product_id, each.quantity);
  }));
  return updated;
};

const handleDeleteFunction = async (body) => {
  await Promise.all(body.map(async (each) => {
    await productService.restoreQtProd(each.product_id, each.quantity);
  }));
};

module.exports = {
  handleFunction,
  handleUpdateFunction,
  handleDeleteFunction,
};