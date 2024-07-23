const assert = require("assert");
const sinon = require("sinon");
const helper = require("../../api/helpers/broadcast-session-change.js");
const sails = require("sails");

describe("broadcastSessionChange", () => {

    afterEach(() => {
        sinon.restore();
    });

    it("Deve retornar sem fazer nada se não houver sessionID", async () => {
        // Arrange
        const req = {
            sessionID: null
        };

        // Act
        const result = await helper.fn({ req });

        // Assert
        assert.strictEqual(result, undefined);
    });

    it("Deve enviar uma mensagem de notificação para o socket se houver sessionID", async () => {
        // Arrange
        const req = {
            sessionID: "abc123"
        };
        const broadcastStub = sinon.stub(sails.sockets, 'broadcast');

        // Act
        await helper.fn({ req });

        // Assert
        assert.strictEqual(broadcastStub.calledOnce, true);
        assert.deepStrictEqual(broadcastStub.args[0][0], 'sessionabc123');
        assert.deepStrictEqual(broadcastStub.args[0][1], 'session');
        assert.deepStrictEqual(broadcastStub.args[0][2], { notificationText: 'You have signed out or signed into a different session in another tab or window. Reload the page to refresh your session.' });
        assert.deepStrictEqual(broadcastStub.args[0][3], req);
    });
});
