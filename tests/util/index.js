const sinon = require("sinon");

const mockAsync = (model, module, result = null) => {
  return sinon.stub(model, module).resolves(result);
};

const RESPONSE = {
  json: function (data) {
    return data;
  },
  serverError: function (error) {
    throw error;
  }
};

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

const REASON = {
  id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5d",
  email: "joão.s@gmail.com",
  password: "password123",
  isAdmin: false
};

const USER = {
  id: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5a",
  phoneNumber: "99999999999",
};

const NEVERHADFORM = {
  id: "e0d4b6ab-039c-4dbf-b780-f1de4a32201a",
  id_user: "cce825bf-09d5-4c8e-a9be-9f4f4a9dba5d",
  dog_size: "small",
  fur: "xxx",
  color_preference: "red",
  gender: "male",
  age: 5,
  breed: "Spitz",
  id_why_have_dog: "959aa0fa-2bd6-4a54-8586-6efc1f9317fb",
  name: "Zoio",
  why_name: "kcsn osos aoidsojv asoidoa",
  buy_or_adopt: "buy",
  when_include: 12,
  expected_personality: "cute",
  dog_expenses: "Yes",
  dog_expenses_value: 5000
}

module.exports = {
  mockAsync,
  RESPONSE,
  USER,
  REASON,
  USERFORM,
  USER,
  NEVERHADFORM
};
