const connection = require('./connection');

const createSale = async () => {
  const [result] = await connection.query(
    'INSERT INTO sales SET date = TIMEDIFF(CURRENT_TIME(), "03:00:00")',
  );
  return { id: result.insertId };
};

const createSaleProduct = async (newId, id, quantity) => {
  const [result] = await connection.query(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ? , ?)',
    [newId, id, quantity],
  );
  return { result };
};

const getById = async (id) => {
  const [result] = await connection.query(
    `SELECT
    date,
    product_id,
    quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s on s.id=sp.sale_id
    WHERE sale_id = ?`,
    [id],
  );
  if (!result.length) return null;
  return result;
};

const create = async (newId, id, quantity) => {
  await createSaleProduct(newId, id, quantity);
  
  const getID = await getById(id);

  return getID;
};

const getAll = async () => {
  const [result] = await connection.query(
    `select 
    sale_id as 'saleId', 
    date,
    product_id,
    quantity
   from StoreManager.sales_products sp
   inner join StoreManager.sales s on s.id=sp.sale_id;`,
  );
  return result;
};

const update = async (id, quantity) => {
  await connection.query(
    'UPDATE sales_products SET quantity = ? WHERE product_id = ?',
    [quantity, id],
  );
  return {
    id,
    quantity,
  };
};

const remove = async (id) => {
  const saleRemove = await getById(id);
  if (!saleRemove) return null;
  await connection.query(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
  return saleRemove;
};

module.exports = {
  getAll,
  getById,
  update,
  create,
  createSale,
  remove,
  createSaleProduct,
};