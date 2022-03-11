const rescue = require('express-rescue');
const products = require('express').Router();
const joi = require('joi');

const productService = require('../services/productService');
const { validateName, validateQuantity } = require('./middlewares/validateInput');

const productSchema = joi.object({
  name: joi.string().min(5).required()
    .messages({
      'string.min': '"name" length must be at least 5 characters long',
      'string.required': '"name" is required',
    }),
  quantity: joi.number().min(1).required()
    .messages({
      'number.base': '"quantity" must be a number larger than or equal to 1',
      'number.min': '"quantity" must be a number larger than or equal to 1',
      'number.required': '"quantity" is required',
    }),
});

const validateProducts = (body) => {
  const { error } = productSchema.validate(body);

  if (error) {
    throw error;
  }
};

products.post('/', validateName, validateQuantity, rescue(async (req, res) => {
  const exist = await productService.getByName(req.body.name);
  if (exist) {
 return res.status(409).json({
    message: 'Product already exists',
  }); 
}
  validateProducts(req.body);
  const { name, quantity } = req.body;

  const newProduct = await productService.create({ name, quantity });

  res.status(201).json(newProduct);
}));

products.get('/', rescue(async (req, res) => {
  const product = await productService.getAll();

  res.status(200).json(product);
}));

products.get('/:id', rescue(async (req, res) => {
  const product = await productService.getById(req.params.id);

  res.status(200).json(product);
}));

products.put('/:id', rescue(async (req, res) => {
  validateProducts(req.body);
  
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productService.update({ id, name, quantity });

  res.status(200).json(updatedProduct);
}));

products.delete('/:id', rescue(async (req, res) => {
  const deleteProduct = await productService.remove(req.params.id);

  if (!deleteProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(deleteProduct);
}));

module.exports = products;
