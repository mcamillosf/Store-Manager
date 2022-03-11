const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = await productModel.getById(id);

  const error = {
    code: 'notFound',
    message: 'Product not found',
  };

  if (!product) {
    throw error;
  }
  return product;
};

const getByName = async (name) => {
  const productName = await productModel.getByName(name);

  return productName;
};

const create = async ({ name, quantity }) => {
  const created = await productModel.create(name, quantity);

  return created;
};

const update = async ({ id, name, quantity }) => {
  await getById(id);

  const updatedProduct = await productModel.update(id, name, quantity);

  return updatedProduct;
};

const updateQtProd = async (id, quantity) => {
  const updatedQtProd = await productModel.updateQtProd(id, quantity);

  return updatedQtProd;
};

const restoreQtProd = async (id, quantity) => {
  const restored = await productModel.restoreQtProd(id, quantity);

  return restored;
};

const remove = async (id) => {
  const deletedProduct = await productModel.remove(id);

  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName,
  updateQtProd,
  restoreQtProd,
};
