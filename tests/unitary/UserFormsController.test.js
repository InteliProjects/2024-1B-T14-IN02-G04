const assert = require("assert");
const controller = require("../../api/controllers/UserFormsController");
const sinon = require("sinon");

const USERFORM = {
  age: 30,
  gender: 'male',
  education: 'Bachelor',
  homeType: 'Apartment',
  family: 'Nuclear',
  familyIncome: '50000',
  homeMembers: '4',
  country: 'Brazil',
  state: 'SP',
  city: 'São Paulo',
  neighborhood: 'Centro',
  dogRelate: 'Loves dogs'
};

const mockAsync = (model, module, result = null) => {
  return sinon.stub(model, module).resolves(result);
};

const RESPONSE = {
  json: function (data) {
    return data;
  },
  serverError: function (error) {
    throw error;
  },
  notFound: function () {
    return { message: "Not Found" };
  }
};

describe("UserFormsController", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Deve criar o formulário com sucesso", async () => {
    const databaseStub = mockAsync(UserForm, "create", USERFORM);
    const req = { body: USERFORM };
    const result = await controller.create(req, RESPONSE);

    assert.strictEqual(databaseStub.calledOnce, true);
    assert.strictEqual(result.message, "User form created successfully");
    assert.deepStrictEqual(result.userForm, USERFORM);
  });

  it("Deve obter todos os formulários com sucesso", async () => {
    const databaseStub = mockAsync(UserForm, "find", [USERFORM]);
    const req = {};
    const result = await controller.getAll(req, RESPONSE);

    assert.strictEqual(databaseStub.calledOnce, true);
    assert.deepStrictEqual(result, [USERFORM]);
  });

});
