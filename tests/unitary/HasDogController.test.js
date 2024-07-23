const assert = require('assert');
const sinon = require('sinon');
const controller = require('../../api/controllers/HasDogFormsController');
const { mockAsync, RESPONSE, REASON } = require('../util/index');
const sails = require('sails');

describe('HasDogFormsController', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('Deve criar o formulário com sucesso', async () => {
        // Arrange
        const createStub = sinon.stub(HasDogForm, "create").resolves(REASON);
        const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(REASON.id);
        const req = {
            body: REASON,
            headers: {
                authorization: "fff"
            }
        };
        const res = {
            json: sinon.spy(),
            serverError: sinon.spy()
        };
    
        // Act   
        await controller.create(req, res);
    
        // Assert
        assert.deepStrictEqual(res.json.getCall(0).args[0], { message: "HasDogForm created successfully", data: REASON });
        assert.strictEqual(createStub.calledOnce, true);
        assert.strictEqual(getUserIdStub.calledOnce, true);
    });
    

    describe('getById', () => {
        it('Deve retornar o formulário pelo ID', async () => {
            // Arrange
            const findOneStub = sinon.stub(HasDogForm, "findOne").resolves(REASON);
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
            assert.strictEqual(findOneStub.calledOnceWith({ id: req.params.id }), true);
            assert(res.json.calledOnceWith(REASON));
        });
    
        it('Deve retornar erro ao buscar o formulário pelo ID', async () => {
            // Arrange
            const findOneStub = sinon.stub(HasDogForm, "findOne").rejects(new Error('Error'));
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
            assert.strictEqual(findOneStub.calledOnce, true);
            assert(res.serverError.calledOnce);
        });
    
        it('Deve retornar notFound se o formulário não for encontrado', async () => {
            // Arrange
            const findOneStub = sinon.stub(HasDogForm, "findOne").resolves(null);
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
            assert.strictEqual(findOneStub.calledOnceWith({ id: req.params.id }), true);
            assert(res.notFound.calledOnce);
        });
    });
    
    describe('update', () => {
        it('Deve atualizar o formulário com sucesso', async () => {
            // Arrange
            const updateStub = sinon.stub(HasDogForm, "updateOne").resolves(REASON);
            const req = {
                params: { id: REASON.id },
                body: { reason: 'REASON' }
            };
            const res = {
                json: sinon.spy(),
                notFound: sinon.spy(),
                serverError: sinon.spy()
            };
    
            // Act   
            await controller.update(req, res);
    
            // Assert
            assert.strictEqual(updateStub.calledOnceWith({ id: req.params.id }), true);
            assert(res.json.calledOnceWith({ message: "HasDogForm updated successfully", data: REASON }));
        });
    
        it('Deve retornar notFound se o formulário não for encontrado para atualização', async () => {
            // Arrange
            const updateStub = sinon.stub(HasDogForm, "updateOne").resolves(null);
            const req = {
                params: { id: REASON.id },
                body: { reason: 'REASON' }
            };
            const res = {
                json: sinon.spy(),
                notFound: sinon.spy(),
                serverError: sinon.spy()
            };
    
            // Act   
            await controller.update(req, res);
    
            // Assert
            assert.strictEqual(updateStub.calledOnceWith({ id: req.params.id }), true);
            assert(res.notFound.calledOnce);
        });
    
        it('Deve retornar erro ao atualizar o formulário', async () => {
            // Arrange
            const updateStub = sinon.stub(HasDogForm, "updateOne").rejects(new Error('Error'));
            const req = {
                params: { id: REASON.id },
                body: { reason: 'REASON' }
            };
            const res = {
                json: sinon.spy(),
                notFound: sinon.spy(),
                serverError: sinon.spy()
            };
    
            // Act   
            await controller.update(req, res);
    
            // Assert
            assert.strictEqual(updateStub.calledOnceWith({ id: req.params.id }), true);
            assert(res.serverError.calledOnce);
        });
    });
    

    describe('getAll', () => {
        it('Deve retornar todos os formulários', async () => {
            // Arrange
            const findStub = sinon.stub(HasDogForm, "find").resolves([REASON]);
            const req = {};
            const res = {
                json: sinon.spy(),
                serverError: sinon.spy()
            };
    
            // Act   
            await controller.getAll(req, res);
    
            // Assert
            assert.strictEqual(findStub.calledOnce, true);
            assert(res.json.calledOnceWith([REASON]));
        });
    
        it('Deve retornar erro ao buscar os formulários', async () => {
            // Arrange
            const findStub = sinon.stub(HasDogForm, "find").rejects(new Error('Error'));
            const req = {};
            const res = {
                json: sinon.spy(),
                serverError: sinon.spy()
            };
    
            // Act   
            await controller.getAll(req, res);
    
            // Assert
            assert.strictEqual(findStub.calledOnce, true);
            assert(res.serverError.calledOnce);
        });
    
    });
});
