const { v4: uuidv4 } = require('uuid');

module.exports = {
  tableName: 'user_forms',
  attributes: {
    id: {
      type: 'string',
      columnName: 'id',
      required: true,
      unique: true
    },

    id_user: {
      model: 'user'
    },

    age: {
      type: 'number',
    },
    gender: {
      type: 'string',
      maxLength: 10
    },
    education: {
      type: 'string',
      maxLength: 100,
    },
    homeType: {
      type: 'string',
      maxLength: 20,
    },
    family: {
      type: 'string',
      maxLength: 100,
    },
    familyIncome: {
      type: 'string',
      maxLength: 100,
    },
    homeMembers: {
      type: 'string',
      maxLength: 100,
    },
    country: {
      type: 'string',
      maxLength: 50,
    },
    state: {
      type: 'string',
      maxLength: 255,
    },
    city: {
      type: 'string',
      maxLength: 255,
    },
    neighborhood: {
      type: 'string',
      maxLength: 255,
    },
    dogRelate: {
      type: 'string',
      maxLength: 50,
    }
  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }
  
};