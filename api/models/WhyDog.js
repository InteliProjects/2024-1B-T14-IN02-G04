const { v4: uuidv4 } = require('uuid');

module.exports = {
  tableName: "why_dog",

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
    child_company: {
      type: 'boolean',
    },
    adult_company: {
      type: 'boolean',
    },
    appearance: {
      type: 'boolean',
    },
    dog_company: {
      type: 'boolean',
    },
    teach_responsibility: {
      type: 'boolean',
    },
    friends: {
      type: 'boolean',
    },
    protection: {
      type: 'boolean',
    },
    help_old_owner: {
      type: 'boolean',
    },
    save_life: {
      type: 'boolean',
    },
    cuteness: {
      type: 'boolean',
    },
    he_chose_me: {
      type: 'boolean',
    },
    gift: {
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

