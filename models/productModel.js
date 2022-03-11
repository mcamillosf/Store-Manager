const connection = require('./connection');

const create = async (name, quantity) => {
  const [result] = await connection.query(
    'INSERT INTO products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return { id: result.insertId, name, quantity };
};

const getAll = async () => {
  const [result] = await connection.query(
    'SELECT * FROM products;',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.query(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  if (!result.length) return null;
  return result[0];
};

const getByName = async (name) => {
  const [result] = await connection.query(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );
  if (!result.length) {
    return null;
  }
  return result[0];
};

const update = async (id, name, quantity) => {
  await connection.query(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  return {
    id,
    name,
    quantity,
  };
};

const updateQtProd = async (id, quantity) => {
  const prod = await getById(id);
  // if (!prod) return null;
  // console.log(prod);
  const prodQt = prod.quantity;
  const newQt = (prodQt - quantity);
  const [result] = await connection.query(
    'UPDATE products SET quantity = ? WHERE id = ?',
    [newQt, id],
  );
  return {
    id,
    name: result.name,
    quantity: newQt,
  };
};

const restoreQtProd = async (id, quantity) => {
  const produ = await getById(id);
  const currentQt = produ.quantity;
  const restored = (currentQt + quantity);
  const [result] = await connection.query(
    'UPDATE products SET quantity = ? WHERE id = ?',
    [restored, id],
  );
  return {
    id,
    name: result.name,
    quantity: restored,
  };
};

const remove = async (id) => {
  const product = await getById(id);
  if (!product) return null;
  await connection.query(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getByName,
  updateQtProd,
  restoreQtProd,
};