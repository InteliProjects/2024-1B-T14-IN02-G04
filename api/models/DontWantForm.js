const { v4: uuidv4 } = require('uuid');

module.exports = {

  tableName: 'dont_want_forms',

  attributes: {
    id: {
      type: 'string',
      columnName: 'id',
      required: true,
      unique: true
    },
    id_user: {
      model: 'user',
    },
    why: {
      type: 'string',
    },

  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }

};