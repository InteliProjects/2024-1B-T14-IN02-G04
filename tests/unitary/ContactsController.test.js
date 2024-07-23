const assert = require("assert");
const sinon = require("sinon");
const controller = require("../../api/controllers/ContactsController");
const { mockAsync, RESPONSE, USER } = require("../util");
const sails = require('sails');

describe("ContactsController", () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('create', () => {
        it("Deve criar um contato com sucesso", async () => {
            // Arrange
            const req = {
                body: { phone: '123456789' },
                headers: { authorization: "eyASCacascSACoIJNdcuiascAP" }
            };

            const formattedNumber = '123-456-789'; // Suponhamos que o número formatado é este
            const createStub = mockAsync(Contact, "create", USER);
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(USER.id);
            const formatNumberStub = sinon.stub(sails.helpers, 'formatNumber').resolves(formattedNumber);

            // Act
            const result = await controller.create(req, RESPONSE);

            // Assert
            assert.strictEqual(createStub.calledOnce, true);
            assert.strictEqual(getUserIdStub.calledOnce, true);
            assert.strictEqual(formatNumberStub.calledOnce, true);
            assert.deepStrictEqual(result, USER);
        });

        it("Deve retornar erro ao criar um contato", async () => {
            // Arrange
            const req = {
                body: { phone: '123456789' },
                headers: { authorization: "eyASCacascSACoIJNdcuiascAP" }
            };

            const formatNumberStub = sinon.stub(sails.helpers, 'formatNumber').rejects(new Error('Error'));
            const createStub = mockAsync(Contact, "create").rejects(new Error('Error'));
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(USER.id);

            // Act & Assert
            await assert.rejects(async () => {
                await controller.create(req, RESPONSE);
            }, Error);
        });
    });

    describe('list', () => {
        it("Deve retornar todos os contatos", async () => {
            // Arrange
            const findStub = mockAsync(Contact, "find", [USER]);
            const req = {};

            // Act
            const result = await controller.list(req, RESPONSE);

            // Assert
            assert.strictEqual(findStub.calledOnce, true);
            assert.deepStrictEqual(result, [USER]);
        });

        it("Deve retornar erro ao buscar todos os contatos", async () => {
            // Arrange
            const findStub = mockAsync(Contact, "find").rejects(new Error('Error'));
            const req = {};

            // Act & Assert
            await assert.rejects(async () => {
                await controller.list(req, RESPONSE);
            }, Error);
        });
    });

    describe('getById', () => {
        it("Deve retornar um contato específico com sucesso", async () => {
            // Arrange
            const findOneStub = mockAsync(Contact, "findOne", USER);
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                }
            };

            // Act
            const result = await controller.getById(req, RESPONSE);

            // Assert
            assert.strictEqual(findOneStub.calledOnce, true);
            assert.deepStrictEqual(result, USER);
        });

        it("Deve retornar erro ao buscar um contato por id", async () => {
            // Arrange
            const findOneStub = mockAsync(Contact, "findOne").rejects(new Error('Error'));
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                }
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.getById(req, RESPONSE);
            }, Error);
        });

        it("Deve retornar 'Contato não encontrado' ao buscar um contato inexistente por id", async () => {
            // Arrange
            const findOneStub = mockAsync(Contact, "findOne", null);
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                }
            };

            // Act
            const result = await controller.getById(req, RESPONSE);

            // Assert
            assert.strictEqual(findOneStub.calledOnce, true);
            assert.deepStrictEqual(result, { error: 'Contato não encontrado' });
        });
    });

    describe('update', () => {
        it("Deve atualizar a senha de um usuário com sucesso", async () => {
            // Arrange
            const updateStub = sinon.stub(User, 'update').callsArgWith(3, null);
            const req = {
                params: {
                    password: "password123"
                },
                body: USER
            };

            // Act
            const result = await controller.update(req, RESPONSE);

            // Assert
            assert.strictEqual(updateStub.calledOnce, true);
            assert.deepStrictEqual(result, { message: "Senha atualizada" });
        });

        it("Deve retornar erro ao atualizar a senha de um usuário", async () => {
            // Arrange
            const updateStub = sinon.stub(User, 'update').callsArgWith(3, new Error('Error'));
            const req = {
                params: {
                    password: "password123"
                },
                body: USER
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.update(req, RESPONSE);
            }, Error);
        });
    });

    describe('delete', () => {
        it("Deve excluir um contato com sucesso", async () => {
            // Arrange
            const destroyOneStub = mockAsync(Contact, "destroyOne", USER);
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                }
            };

            // Act
            const result = await controller.delete(req, RESPONSE);

            // Assert
            assert.strictEqual(destroyOneStub.calledOnce, true);
            assert.deepStrictEqual(result, { message: "Contato excluído com sucesso" });
        });

        it("Deve retornar erro ao excluir um contato", async () => {
            // Arrange
            const destroyOneStub = mockAsync(Contact, "destroyOne").rejects(new Error('Error'));
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                }
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.delete(req, RESPONSE);
            }, Error);
        });
    });
});
