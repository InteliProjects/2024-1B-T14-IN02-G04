const assert = require("assert");
const sinon = require("sinon");
const controller = require("../../api/controllers/NeverHadFormsController");
const { mockAsync, NEVERHADFORM, RESPONSE } = require("../util");
const sails = require('sails');

describe("NeverHadFormsController", () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('create', () => {
        it("Deve criar o formulário com sucesso", async () => {
            // Arrange
            const createStub = mockAsync(NeverHadForm, "create", NEVERHADFORM);
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(NEVERHADFORM.id_user);
            const req = {
                body: NEVERHADFORM,
                headers: { authorization: "eyASCacascSACoIJNdcuiascAP" }
            };

            // Act
            const result = await controller.create(req, RESPONSE);

            // Assert
            assert.strictEqual(createStub.calledOnce, true);
            assert.deepStrictEqual(result, NEVERHADFORM);
            assert.strictEqual(getUserIdStub.calledOnce, true);
        });

        it("Deve retornar erro ao criar o formulário", async () => {
            // Arrange
            const createStub = mockAsync(NeverHadForm, "create").rejects(new Error('Error'));
            const getUserIdStub = sinon.stub(sails.helpers, 'getUserId').resolves(NEVERHADFORM.id_user);
            const req = {
                body: NEVERHADFORM,
                headers: { authorization: "eyASCacascSACoIJNdcuiascAP" }
            };

            // Act & Assert
            await assert.rejects(async () => {
                await controller.create(req, RESPONSE);
            }, Error);
        });
    });
});
