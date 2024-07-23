const { v4: uuidv4 } = require('uuid');

module.exports = {

  attributes: {
    
    id: {
      type: 'string',
      columnName: 'id',
      required: true,
      unique: true
    },
    id_user: {
      model: 'user',
      //required: true,
    },
    full_name: {
      type: 'string',
      maxLength: 255,
    },
    social_name: {
      type: 'string',
      maxLength: 150,
    },
    phone: {
      type: 'string',
      unique: true,
    },

  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }

};

