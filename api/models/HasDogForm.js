const { v4: uuidv4 } = require('uuid');

module.exports = {

  tableName: "has_dog_forms",

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
    name: {
      type: 'string',
      maxLength: 50,
    },
    gender: {
      type: 'string',
      maxLength: 50,
    },
    owner: {
      type: 'string',
      maxLength: 50,
    },
    neutered: {
      type: 'string',
      maxLength: 50
    },
    how_long: {
      type: 'number',
    },
    is_first: {
      type: 'string',
      maxLength: 50,
    },
    other_pets: {
      type: 'string',
      maxLength: 50
    },
    dog_age: {
      type: 'string',
      maxLength: 50,
    },
    breed: {
      type: 'string',
      maxLength: 50,
    },
    where_got: {
      type: 'string',
      maxLength: 150
    },
    payed: {
      type: 'string',
      maxLength: 50,
    },
    age_got: {
      type: 'number'
    },
    dog_personality: {
      type: 'string'
    },
    id_why_dog: {
      model: 'WhyDog'
    },
    cant_keep_description: {
      type: 'string',
      maxLength: 150
    },
    veterinary_last_years: {
      type: 'string',
      maxLength: 150
    },
    vet_visits : {
      type: 'number'
    },
    about: {
      type: 'string',
      maxLength: 150
    },

  },

  beforeCreate: async (values, proceed) => {
    values.id = uuidv4();
    return proceed();
  }

};

