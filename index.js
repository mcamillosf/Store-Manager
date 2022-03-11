require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./controllers/middlewares');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);
app.use('/sales', salesController);

app.use(middlewares.joiError);
app.use(middlewares.domainError);
app.use(middlewares.error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
