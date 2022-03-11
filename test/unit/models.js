const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../models/connection");
const prodModel = require("../../models/productModel");
const saleModel = require("../../models/salesModel");

describe("Verificando a camada model", () => {
  describe("Verifica se o produto é inserido com sucesso", () => {
    const prodName = "deregjhonson";
    const prodQuantity = 17;

    before(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, "query").resolves(execute);
    });

    after(async () => {
      connection.query.restore();
    });
    it("Verifica se retorna um objeto", async () => {
      const response = await prodModel.create(prodName, prodQuantity);
      expect(response).to.be.a("object");
    });

    it("Verifica se o produto tem um novo ID", async () => {
      const response = await prodModel.create(prodName, prodQuantity);

      expect(response).to.have.a.property("id");
    });
  });

  describe("Busca todos os produtos do banco", () => {
    describe("Quando o banco não tiver nenhum produto", () => {
      before(() => {
        sinon.stub(connection, "query").resolves([[]]);
      });

      after(() => {
        connection.query.restore();
      });

      it("Retorna um array", async () => {
        const response = await prodModel.getAll();

        expect(response).to.be.an("array");
      });
      it("Verifica se o array está vazio", async () => {
        const response = await prodModel.getAll();

        expect(response).to.be.empty;
      });
    });
  });
  describe("Buscando produto por id e por nome", () => {
    describe("Verificando metodo getByID & getByName", () => {
      const product = [
        {
          id: 1,
          name: "teste nome",
          quantity: 17,
        },
      ];

      before(() => {
        sinon.stub(connection, "query").resolves([product]);
      });

      after(() => {
        connection.query.restore();
      });

      it("Verificando se o getById retorna um resultado", async () => {
        const result = await prodModel.getById(product[0].id);

        expect(result).to.be.a("object");
      });

      it("Verificando se o getByName retorna um resultado", async () => {
        const result = await prodModel.getByName(product[0].name);

        expect(result).to.be.a("object");
      });
    });
  });
});

describe("Verificando Sales", () => {
  describe("Verifica se vende produtos", () => {
    const saleId = 1;
    const prodId = 1;
    const quantity = 2;

    before(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, "query").resolves(execute);
    });

    after(async () => {
      connection.query.restore();
    });

    it("Verifica se o produto e vendido", async () => {
      const result = await saleModel.createSaleProduct(
        saleId,
        prodId,
        quantity
      );

      expect(result).to.be.a("object");
    });
  });
  describe("Verifica se faz o registro de venda do produto", () => {
    const saleId = 1;
    const prodId = 1;
    const quantity = 2;

    before(() => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, "query").resolves(execute);
    });

    after(() => {
      connection.query.restore();
    });

    it("Verifica metodo create", async () => {
      const result = await saleModel.create(saleId, prodId, quantity);

      expect(result).to.be.null;
    });
  });
  describe("Verificando o metodo getAll", () => {
    const execute = [{}, {}];

    before(() => {
      sinon.stub(connection, "query").resolves(execute);
    });

    after(() => {
      connection.query.restore();
    });

    it("Verifica se retorna uma lista", async () => {
      const result = await saleModel.getAll();

      expect(result).to.be.a("object");
    });
  });
});
