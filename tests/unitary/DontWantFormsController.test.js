const assert = require('assert');
const sinon = require('sinon');
const controller = require('../../api/controllers/DontWantFormsController');
const { mockAsync, RESPONSE, REASON } = require('../util');
const sails = require('sails');

describe('DontWantFormsController', () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('create', () => {
        it('Deve criar a resposta com sucesso', async () => {
            // Arrange
            const createStub = mockAsync(DontWantForm, "create", REASON);
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
            const createStub = mockAsync(DontWantForm, "create").rejects(new Error('Error'));
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

    describe('getAll', () => {
        it('Deve retornar todos os DontWantForms', async () => {
            // Arrange
            const findStub = mockAsync(DontWantForm, "find", [REASON]);
            const req = {};
            const res = {
                view: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.getAll(req, res);

            // Assert
            assert(findStub.calledOnce);
            assert(res.view.calledOnceWith("dontwantforms/list", { dontWantForms: [REASON] }));
        });

        it('Deve retornar erro ao buscar DontWantForms', async () => {
            // Arrange
            const findStub = mockAsync(DontWantForm, "find").rejects(new Error('Error'));
            const req = {};
            const res = {
                view: sinon.spy(),
                serverError: sinon.spy()
            };

            // Act   
            await controller.getAll(req, res);

            // Assert
            assert(findStub.calledOnce);
            assert(res.serverError.calledOnce);
        });
    });

    describe('update', () => {
        it('Deve atualizar DontWantForm com sucesso', async () => {
            // Arrange
            const updateStub = mockAsync(DontWantForm, "update", true);
            const toLowerCaseStub = sinon.stub(sails.helpers, 'toLowerCase').resolves('reason');
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
            assert(res.json.calledOnceWith({ message: "DontWantForm updated successfully" }));
        });

        it('Deve retornar erro ao atualizar DontWantForm', async () => {
            // Arrange
            const updateStub = mockAsync(DontWantForm, "update").rejects(new Error('Error'));
            const toLowerCaseStub = sinon.stub(sails.helpers, 'toLowerCase').resolves('reason');
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
});
