const { v4: uuidv4 } = require('uuid');

module.exports = {
  tableName: "why_have_dog",

  attributes: {
    id: {
      type: 'string',
      columnName: 'id',
      required: true,
      unique: true
    },
    child_company: {
      type: 'boolean',
    },
    adult_company: {
      type: 'boolean',
    },
    parents_had: {
      type: 'boolean',
    },
    teach_responsibility: {
      type: 'boolean',
    },
    friends_have: {
      type: 'boolean',
    },
    protection: {
      type: 'boolean',
    },
    tv: {
      type: 'boolean',
    },
    other: {
      type: 'string',
    },

  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }

};

