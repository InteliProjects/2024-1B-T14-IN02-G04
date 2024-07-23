const assert = require('assert');
const sinon = require('sinon');
const controller = require('../../api/controllers/HadDogFormsController');
const { mockAsync, RESPONSE, REASON } = require('../util');
const sails = require('sails');

describe('HadDogFormsController', () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('create', () => {
        it('Deve criar a resposta com sucesso', async () => {
            // Arrange
            const createStub = mockAsync(HadDogForm, "create", REASON);
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(REASON.id);
            const req = {
                body: REASON,
                headers: {
                    authorization: "fff"
                }
            };

            // Act   
            const result = await controller.create(req, RESPONSE);

            // Assert
            assert.deepStrictEqual(result, REASON);
            assert.strictEqual(createStub.calledOnce, true);
            assert.strictEqual(getUserIdStub.calledOnce, true);
        });

        it('Deve retornar erro ao criar a resposta', async () => {
            // Arrange
            const createStub = mockAsync(HadDogForm, "create").rejects(new Error('Error'));
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(REASON.id);
            const req = {
                body: REASON,
                headers: {
                    authorization: "fff"
                }
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.create(req, RESPONSE);
            }, Error);
        });
    });

    describe('getById', () => {
        it('Deve retornar HadDogForm pelo ID', async () => {
            // Arrange
            const findOneStub = mockAsync(HadDogForm, "findOne", REASON);
            const req = {
                params: { id: REASON.id }
            };
            const res = {
                json: sinon.spy(),
                notFound: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.getById(req, res);

            // Assert
            assert(findOneStub.calledOnceWith({ id: req.params.id }));
            assert(res.json.calledOnceWith(REASON));
        });

        it('Deve retornar erro ao buscar HadDogForm pelo ID', async () => {
            // Arrange
            const findOneStub = mockAsync(HadDogForm, "findOne").rejects(new Error('Error'));
            const req = {
                params: { id: REASON.id }
            };
            const res = {
                json: sinon.spy(),
                notFound: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.getById(req, res);

            // Assert
            assert(findOneStub.calledOnce);
            assert(res.serverError.calledOnce);
        });

        it('Deve retornar notFound se o HadDogForm não for encontrado', async () => {
            // Arrange
            const findOneStub = mockAsync(HadDogForm, "findOne", null);
            const req = {
                params: { id: REASON.id }
            };
            const res = {
                json: sinon.spy(),
                notFound: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.getById(req, res);

            // Assert
            assert(findOneStub.calledOnceWith({ id: req.params.id }));
            assert(res.notFound.calledOnce);
        });
    });

    describe('update', () => {
        it('Deve atualizar HadDogForm com sucesso', async () => {
            // Arrange
            const updateStub = mockAsync(HadDogForm, "update", true);
            const req = {
                params: { id: REASON.id },
                body: { reason: 'REASON' }
            };
            const res = {
                json: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.update(req, res);

            // Assert
            assert(updateStub.calledOnceWith({ id: req.params.id }, req.body));
            assert(res.json.calledOnceWith({ message: "HadDogForm updated successfully" }));
        });

        it('Deve retornar erro ao atualizar HadDogForm', async () => {
            // Arrange
            const updateStub = mockAsync(HadDogForm, "update").rejects(new Error('Error'));
            const req = {
                params: { id: REASON.id },
                body: { reason: 'REASON' }
            };
            const res = {
                json: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.update(req, res);

            // Assert
            assert(updateStub.calledOnce);
            assert(res.serverError.calledOnce);
        });
    });

    describe('getAll', () => {
        it('Deve retornar todos os HadDogForms', async () => {
            // Arrange
            const findStub = mockAsync(HadDogForm, "find", [REASON]);
            const req = {};
            const res = {
                json: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.getAll(req, res);

            // Assert
            assert(findStub.calledOnce);
            assert(res.json.calledOnceWith([REASON]));
        });

        it('Deve retornar erro ao buscar HadDogForms', async () => {
            // Arrange
            const findStub = mockAsync(HadDogForm, "find").rejects(new Error('Error'));
            const req = {};
            const res = {
                json: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.getAll(req, res);

            // Assert
            assert(findStub.calledOnce);
            assert(res.serverError.calledOnce);
        });
    });
});
