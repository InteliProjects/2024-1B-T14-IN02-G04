const { v4: uuidv4 } = require('uuid');

module.exports = {

  tableName : 'users',
  attributes: {
    id: {
      type: 'string',
      columnName: 'id',
      required: true,
      unique: true
    },
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
    },

    isAdmin: {
      type: 'boolean',
      defaultsTo: false,
    },
  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }

};

