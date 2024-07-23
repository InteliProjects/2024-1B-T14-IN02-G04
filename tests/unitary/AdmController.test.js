const assert = require("assert");
const controller = require("../../api/controllers/AdmController");
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

describe("AdmController", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Deve renderizar a página com todos os formulários", async () => {
    const databaseStubHadDogForm = mockAsync(HadDogForm, "find", [USERFORM]);
    const databaseStubHasDogForm = mockAsync(HasDogForm, "find", [USERFORM]);
    const databaseStubUserForm = mockAsync(UserForm, "find", [USERFORM]);
    const databaseStubNeverHadForm = mockAsync(NeverHadForm, "find", [USERFORM]);
    const databaseStubDontWantForm = mockAsync(DontWantForm, "find", [USERFORM]);

    const req = {};
    const res = {
      view: function (view, data) {
        return { view, data };
      },
      serverError: RESPONSE.serverError
    };
    const result = await controller.renderPage(req, res);

    assert.strictEqual(databaseStubHadDogForm.calledOnce, true);
    assert.strictEqual(databaseStubHasDogForm.calledOnce, true);
    assert.strictEqual(databaseStubUserForm.calledOnce, true);
    assert.strictEqual(databaseStubNeverHadForm.calledOnce, true);
    assert.strictEqual(databaseStubDontWantForm.calledOnce, true);
    assert.deepStrictEqual(result.view, 'pages/telaAdm');
    assert.deepStrictEqual(result.data, {
      hadDogForms: [USERFORM],
      hasDogForms: [USERFORM],
      userForms: [USERFORM],
      neverHadForms: [USERFORM],
      dontWantForms: [USERFORM]
    });
  });

  it("Deve retornar todas as respostas em JSON", async () => {
    const databaseStubHadDogForm = mockAsync(HadDogForm, "find", [USERFORM]);
    const databaseStubHasDogForm = mockAsync(HasDogForm, "find", [USERFORM]);
    const databaseStubUserForm = mockAsync(UserForm, "find", [USERFORM]);
    const databaseStubNeverHadForm = mockAsync(NeverHadForm, "find", [USERFORM]);
    const databaseStubDontWantForm = mockAsync(DontWantForm, "find", [USERFORM]);

    const req = {};
    const result = await controller.showAllResponses(req, RESPONSE);

    assert.strictEqual(databaseStubHadDogForm.calledOnce, true);
    assert.strictEqual(databaseStubHasDogForm.calledOnce, true);
    assert.strictEqual(databaseStubUserForm.calledOnce, true);
    assert.strictEqual(databaseStubNeverHadForm.calledOnce, true);
    assert.strictEqual(databaseStubDontWantForm.calledOnce, true);
    assert.deepStrictEqual(result, {
      hadDogForms: [USERFORM],
      hasDogForms: [USERFORM],
      userForms: [USERFORM],
      neverHadForms: [USERFORM],
      dontWantForms: [USERFORM]
    });
  });
});
