const salesModel = require('../models/salesModel');

const createSale = async () => {
  const result = await salesModel.createSale();

  return result;
};

const create = async (newId, id, quantity) => {
  const created = await salesModel.create(newId, id, quantity);

  return created;
};

const getAll = async () => {
  const allSales = salesModel.getAll();

  return allSales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  const error = {
    code: 'notFound',
    message: 'Sale not found',
  };

  if (!sale) {
    throw error;
  }
  return sale;
};

const update = async (newId, id, quantity) => {
  await getById(newId);

  const updatedSale = await salesModel.update(id, quantity);

  return updatedSale;
};

const remove = async (id) => {
  const deletedSale = await salesModel.remove(id);

  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  update,
  create,
  createSale,
  remove,
};