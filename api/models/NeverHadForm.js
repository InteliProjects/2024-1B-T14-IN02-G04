const { v4: uuidv4 } = require('uuid');

module.exports = {
  tableName: "never_had_forms",
  
  attributes: {
    id: {
      type: 'string',
      columnName: 'id',
      required: true,
      unique: true
    },
    id_user: {
      model: 'user',
      //required: true
    },
    dog_size: {
      type: 'string',
      maxLength: 10,
    },
    fur: {
      type: 'string',
      maxLength: 10,
    },
    color_preference: {
      type: 'string',
      maxLength: 20,
    },
    gender: {
      type: 'string',
      maxLength: 10,
    },
    age: {
      type: 'number',
    },
    breed: {
      type: 'string',
      maxLength: 50,
    },
    id_why_have_dog: {
      model: 'WhyHaveDog',
      //required: true
    },
    name: {
      type: 'string',
      maxLength: 50,
    },
    why_name: {
      type: 'string',
      maxLength: 50,
    },
    buy_or_adopt: {
      type: 'string',
      maxLength: 50,
    },
    when_include: {
      type: 'number',
    },
    expected_personality: {
      type: 'string'
    },
    dog_expenses: {
      type: 'string',
      maxLength: 50,
    },
    dog_expenses_value: {
      type: 'number',
    },
  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }

};
