const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../models/connection");
const prodService = require("../../services/productService");
const saleService = require("../../services/salesService");

describe("Testando products da camada de service", () => {
  describe("Testando product service getAll", () => {
		before(async () => {
      const execute = [{ id: 1, name: 'teste', quantity: 17 }];

      sinon.stub(connection, "query").resolves(execute);
    });

    after(async () => {
      connection.query.restore();
    });

		it('Verifica o retorno do metodo getAll', async () => {
			const result = await prodService.getAll();

			expect(result).to.be.a('object');
		});
	});

	describe("Testando product service getByID", () => {
		const prod = [{ id: 1, name: 'teste', quantity: 17 }];
		before(async () => {

      sinon.stub(connection, "query").resolves([prod]);
    });

    after(async () => {
      connection.query.restore();
    });

		it('Verifica o retorno do metodo getById', async () => {
			const result = await prodService.getById(prod[0].id);

			expect(result).to.be.a('object');
		});
	});

	describe("Testando product service getByName", () => {
		const prod = [{ id: 1, name: 'teste', quantity: 17 }];
		before(async () => {

      sinon.stub(connection, "query").resolves([prod]);
    });

    after(async () => {
      connection.query.restore();
    });

		it('Verifica o retorno do metodo getByName', async () => {
			const result = await prodService.getByName(prod[0].name);

			expect(result).to.be.a('object');
		});
	});

	describe("Testando product service create", () => {
		const prod = [{ name: 'teste', quantity: 17 }];
		before(async () => {

      sinon.stub(connection, "query").resolves([prod]);
    });

    after(async () => {
      connection.query.restore();
    });

		it('Verifica se cria um produto com metodo create', async () => {
			const result = await prodService.create(prod[0]);

			expect(result).to.be.a('object');
		});
	});
});

describe("Testando sales da camada de service", () => {
	describe("Testa sales service createSale", () => {

		before(() => {
			const execute = [{ id: 1 }];

			sinon.stub(connection, 'query').resolves(execute);
		});

		after(() => {
			connection.query.restore();
		});

		it('Verifica o metodo createSale', async () => {
			const result = await saleService.createSale();

			expect(result).to.be.a('object');
		});
	});
	describe("Testa sales service create", () => {
		const prod = [{ saleId: 1, prodId: 1, quantity: 5 }];
		before(async () => {

      sinon.stub(connection, "query").resolves([prod]);
    });

    after(async () => {
      connection.query.restore();
    });

		it('Testando o metodo create', async () => {
			const result = await saleService.create(prod[0].saleId, prod[0].prodId, prod[0].quantity)

			expect(result).to.be.a('array');
		});
	});

	describe("Testando sales service getAll", () => {
		before(async () => {
      const execute = [{ id: 1, name: 'teste', quantity: 17 }];

      sinon.stub(connection, "query").resolves(execute);
    });

    after(async () => {
      connection.query.restore();
    });

		it('Verifica o metodo getAll', async () => {
			const result = await saleService.getAll();

			expect(result).to.be.a('object');
		});
	});

	describe("Verifica o sales service buscando por id", () => {
		const prod = [{ saleId: 1, prodId: 1, quantity: 5 }];
		before(async () => {

      sinon.stub(connection, "query").resolves([prod]);
    });

    after(async () => {
      connection.query.restore();
    });

		it('Verifica o retorno do metodo getById', async () => {
			const result = await saleService.getById(prod[0].saleId);

			expect(result).to.be.a('array');
		});
	});
});
