const { v4: uuidv4 } = require('uuid');

module.exports = {
  tableName: "other_pets",

  attributes: {
    id: {
      type: 'string',
      columnName: 'id',
      required: true,
      unique: true
    },
    id_user: {
      model: 'OtherPet',
      //required: true
    },
    cats: {
      type: 'number',
    },
    dogs: {
      type: 'number',
    },
    other: {
      type: 'number',
    },

  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }

};