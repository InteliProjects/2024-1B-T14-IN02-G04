const assert = require("assert");
const sinon = require("sinon");
const controller = require("../../api/controllers/WhyHaveDogController");
const { mockAsync, RESPONSE, USER } = require("../util");
const sails = require('sails');

describe("WhyHaveDogController", () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('create', () => {
        it("Deve criar uma razão para ter um cachorro com sucesso", async () => {
            // Arrange
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(USER.id);
            const createStub = mockAsync(WhyHaveDog, "create", USER);
            const req = {
                body: USER,
                headers: { authorization: "eyASCacascSACoIJNdcuiascAP" }
            };

            // Act
            const result = await controller.create(req, RESPONSE);

            // Assert
            assert.strictEqual(getUserIdStub.calledOnce, true);
            assert.strictEqual(createStub.calledOnce, true);
            assert.deepStrictEqual(result, USER);
        });

        it("Deve retornar erro ao criar uma razão para ter um cachorro", async () => {
            // Arrange
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(USER.id);
            const createStub = mockAsync(WhyHaveDog, "create").rejects(new Error('Error'));
            const req = {
                body: USER,
                headers: { authorization: "eyASCacascSACoIJNdcuiascAP" }
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.create(req, RESPONSE);
            }, Error);
        });
    });

    describe('getAll', () => {
        it("Deve retornar todas as razões para ter um cachorro", async () => {
            // Arrange
            const findStub = mockAsync(WhyHaveDog, "find", [USER]);
            const req = {};

            // Act
            const result = await controller.getAll(req, RESPONSE);

            // Assert
            assert.strictEqual(findStub.calledOnce, true);
            assert.deepStrictEqual(result, [USER]);
        });

        it("Deve retornar erro ao buscar todas as razões para ter um cachorro", async () => {
            // Arrange
            const findStub = mockAsync(WhyHaveDog, "find").rejects(new Error('Error'));
            const req = {};

            // Act & Assert
            await assert.rejects(async () => {
                await controller.getAll(req, RESPONSE);
            }, Error);
        });
    });
});
