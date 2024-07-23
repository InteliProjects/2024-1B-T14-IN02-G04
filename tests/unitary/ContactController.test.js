const assert = require("assert");
const sinon = require("sinon");
const controller = require("../../api/controllers/ContactsController");
const { mockAsync, RESPONSE, USER } = require("../util");

describe("ContactsController", () => {
  it("Deve formatar o número de telefone", async () => {
    //arrange
    const formatPhoneNumberStub = mockAsync(
      sails.helpers,
      "format-number",
      "99999999999"
    );
    const databaseStub = mockAsync(Contact, "create", true);
    const req = {
      body: USER,
    };

    //act
    const result = await controller.create(req, RESPONSE);

    //assert
    assert.deepStrictEqual(result, true);
    assert.strictEqual(databaseStub.calledOnce, true);
  });
});
