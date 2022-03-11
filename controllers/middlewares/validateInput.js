const nameLength = '"name" length must be at least 5 characters long';
const nameRequired = '"name" is required';
const quantityLength = '"quantity" must be a number larger than or equal to 1';
const quantityRequired = '"quantity" is required';
const productRequired = '"product_id" is required';
const amount = 'Such amount is not permitted to sell';
const productService = require('../../services/productService');

// const convert = require('./convertInput');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: nameRequired });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: nameLength });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: quantityRequired });
  }
  if (quantity < 1 || typeof (quantity) !== 'number') {
    return res.status(422).json({ message: quantityLength });
  }
  next();
};

const validateProductID = (req, res, next) => {
  const bodyProductID = req.body;
  
  const FilterEmpty = bodyProductID.filter((each) => each.product_id === undefined);

    if (FilterEmpty.length >= 1) {
      return res.status(400).json({ message: productRequired });
    }

  next();
};

const validateQuantityArray = (req, res, next) => {
  const bodyQuantity = req.body;

  // Josué ajudou aqui.
  if (bodyQuantity.some((each) => each.quantity === undefined)) {
    return res.status(400).json({ message: quantityRequired });
  }
  if (bodyQuantity.some((each) => each.quantity < 1 || typeof each.quantity !== 'number')) {
    return res.status(422).json({ message: quantityLength });
  }

  next();
};

const validateStockQuantity = async (req, res, next) => {
  const { body } = req;

  const updated = await Promise.all(body.map(async (each) => {
    const getProd = await productService.getById(each.product_id);
    const stockQt = getProd.quantity;
    if (each.quantity > stockQt) return true;
  }));

  const validatedQt = updated.some((e) => e === true);

  if (validatedQt) {
    return res.status(422).json({ message: amount });
  }

  next();
};

module.exports = {
  validateName,
  validateQuantity,
  validateProductID,
  validateQuantityArray,
  validateStockQuantity,
};