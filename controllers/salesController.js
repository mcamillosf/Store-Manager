const rescue = require('express-rescue');
const sales = require('express').Router();
const joi = require('joi');

const salesService = require('../services/salesService');
const productService = require('../services/productService');
const { handleFunction, handleDeleteFunction } = require('../helper/insertBD');
const convert = require('../helper/convertInput');
const { 
  validateQuantityArray, 
  validateProductID, 
  validateStockQuantity,
 } = require('./middlewares/validateInput');

const saleSchema = joi.array().items(joi.object(({
  id: joi.number().min(1).required().messages({
    'number.required': '"product_id" is required"',
  }),
  quantity: joi.number().min(1).required().messages({
    'number.base': '"quantity" must be a number larger than or equal to 1',
    'number.required': '"quantity" is required"',
    'number.min': '"quantity" must be a number larger than or equal to 1',
  }),
})));

const validateSale = (body) => {
  const converted = convert(body);
  const { error } = saleSchema.validate(converted);

  if (error) {
    throw error;
  }
};

sales.post('/', validateProductID, validateQuantityArray, validateStockQuantity,
   rescue(async (req, res) => {
    validateSale(req.body);
    const { id } = await salesService.createSale();
    await handleFunction(id, req.body);
    const array = req.body;
    const obj = {
      id,
      itemsSold: array,
    };

    res.status(201).json(obj);
}));

sales.get('/', rescue(async (req, res) => {
  const salesAll = await salesService.getAll();

  res.status(200).json(salesAll);
}));

sales.get('/:id', rescue(async (req, res) => {
  const sale = await salesService.getById(req.params.id);

  res.status(200).json(sale);
}));

sales.put('/:id', validateProductID, validateQuantityArray, rescue(async (req, res) => {
  validateSale(req.body);

  const { id } = req.params;
  const i = Number(id);
  const { body } = req;
  await Promise.all(body.map(async (each) => {
    const getProd = await productService.getById(each.product_id);
    const stockQt = getProd.quantity;
    if (each.quantity > stockQt) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }
    await salesService.update(i, each.product_id, each.quantity);
  }));
  const newObj = {
    saleId: i,
    itemUpdated: body,
  };

  res.status(200).json(newObj);
}));

sales.delete('/:id', rescue(async (req, res) => {
  const body = await salesService.getById(req.params.id);
  await handleDeleteFunction(body);

  const deleteProduct = await salesService.remove(req.params.id);

  if (!deleteProduct) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(deleteProduct);
}));

module.exports = sales;
