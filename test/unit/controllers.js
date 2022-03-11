const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../models/connection");
const prodController = require("../../controllers/productController");
const request = require('supertest');

// Peguei com o Rafa Janovicci
describe('Busca de produtos', () => {
  it('Fazendo uma busca por todos os produtos', () => {
    prodController.get('/', function(req, res) {
      res.status(200).json({});
    });

    request(prodController)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        console.log(response);
        expect(response.body).to.be.an('object');
      });
  });

  it('Buscando produto por id', () => {
    prodController.get('/1', function(req, res) {
      res.status(200).json({
        id: 1,
        name: "Beyblade",
        quantity: 10
      });
    });

    request(prodController)
      .get('/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.deep.equal({ id: 1 });
      });
  });
}); 