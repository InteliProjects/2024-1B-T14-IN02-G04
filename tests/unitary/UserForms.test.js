const assert = require("assert");
const sinon = require("sinon");
const controller = require("../../api/controllers/UsersController");
const { mockAsync, RESPONSE, USER } = require("../util");
const sails = require('sails');

describe("UserController", () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('create', () => {
        it("Deve criar um usuário com sucesso", async () => {
            // Arrange
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(USER.id);
            const createStub = mockAsync(User, "create", USER);
            const req = {
                body: USER,
                headers: { authentication: "eyASCacascSACoIJNdcuiascAP" }
            };

            // Act
            const result = await controller.create(req, RESPONSE);

            // Assert
            assert.strictEqual(getUserIdStub.calledOnce, true);
            assert.strictEqual(createStub.calledOnce, true);
            assert.deepStrictEqual(result, USER);
        });

        it("Deve retornar erro ao criar usuário", async () => {
            // Arrange
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(USER.id);
            const createStub = mockAsync(User, "create").rejects(new Error('Error'));
            const req = {
                body: USER,
                headers: { authentication: "eyASCacascSACoIJNdcuiascAP" }
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.create(req, RESPONSE);
            }, Error);
        });
    });

    describe('list', () => {
        it("Deve retornar todos os usuários criados", async () => {
            // Arrange
            const findStub = mockAsync(User, "find", [USER]);
            const req = {};

            // Act
            const result = await controller.list(req, RESPONSE);

            // Assert
            assert.strictEqual(findStub.calledOnce, true);
            assert.deepStrictEqual(result, [USER]);
        });

        it("Deve retornar erro ao buscar todos os usuários", async () => {
            // Arrange
            const findStub = mockAsync(User, "find").rejects(new Error('Error'));
            const req = {};

            // Act & Assert
            await assert.rejects(async () => {
                await controller.list(req, RESPONSE);
            }, Error);
        });
    });

    describe('getById', () => {
        it("Deve retornar o usuário específico baseado no id", async () => {
            // Arrange
            const findOneStub = mockAsync(User, "findOne", USER);
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

        it("Deve retornar erro ao buscar usuário por id", async () => {
            // Arrange
            const findOneStub = mockAsync(User, "findOne").rejects(new Error('Error'));
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

        it("Deve retornar 'Usuário não encontrado' ao buscar usuário inexistente por id", async () => {
            // Arrange
            const findOneStub = mockAsync(User, "findOne", null);
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                }
            };

            // Act
            const result = await controller.getById(req, RESPONSE);

            // Assert
            assert.strictEqual(findOneStub.calledOnce, true);
            assert.deepStrictEqual(result, { error: 'Usuário não encontrado.' });
        });
    });

    describe('updatePhone', () => {
        it("Deve atualizar o número de telefone do usuário com sucesso", async () => {
            // Arrange
            const updateOneStub = mockAsync(User, "updateOne", USER);
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                },
                param: (param) => {
                    return param === 'id' ? 'cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a' : '123456789';
                }
            };

            // Act
            const result = await controller.updatePhone(req, RESPONSE);

            // Assert
            assert.strictEqual(updateOneStub.calledOnce, true);
            assert.deepStrictEqual(result, USER);
        });

        it("Deve retornar erro ao atualizar o número de telefone do usuário", async () => {
            // Arrange
            const updateOneStub = mockAsync(User, "updateOne").rejects(new Error('Error'));
            const req = {
                params: {
                    id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a"
                },
                param: (param) => {
                    return param === 'id' ? 'cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a' : '123456789';
                }
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.updatePhone(req, RESPONSE);
            }, Error);
        });

        it("Deve retornar 'ID de usuário e novo número são necessários.' ao tentar atualizar sem parâmetros", async () => {
            // Arrange
            const updateOneStub = mockAsync(User, "updateOne").rejects(new Error('Error'));
            const req = {
                params: {},
                param: (param) => {
                    return '';
                }
            };

            // Act
            const result = await controller.updatePhone(req, RESPONSE);

            // Assert
            assert.strictEqual(updateOneStub.notCalled, true);
            assert.deepStrictEqual(result, { error: 'ID de usuário e novo número são necessários.' });
        });
    });
});
