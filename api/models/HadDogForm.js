const { v4: uuidv4 } = require('uuid');

module.exports = {

  tableName: "had_dog_forms",

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
    name: {
      type: 'string',
      maxLength: 50,
    },
    personality: {
      type: 'string',
      //required: true,
      maxLength: 2000,
    },
    owner: {
      type: 'string',
      maxLength: 50,
    },
    other_owner:{
      type: 'string',
      maxLength: 50
    },
    how_long_with: {
      type: 'string',
    },
    is_first: {
      type: 'boolean',
    },
    other_pets: {
      type: 'string',
      maxLength: 255
    },
    age_got: {
      type: 'string'
    },
    neutered: {
      type: 'boolean'
    },
    months_neutered: {
      type: 'string',
    },
    breed: {
      type: 'string',
      maxLength: 50,
    },
    which_breed: {
      type: 'string',
      maxLength: 100,
    },
    where_got: {
      type: 'string',
      maxLength: 150
    },
    other_got: {
      type: 'string',
      maxLength: 50
    },
    price: {
      type: 'string'
    },
    id_why_dog: {
      model: 'WhyDog'
    },
    characteristics_keep: {
      type: 'string',
    },
    who_chose_name: {
      type: 'string',
      maxLength: 50
    },
    other_chose: {
      type: 'string',
      maxLength: 50
    },
    what_liked_most: {
      type: 'string'
    },
    didnt_like: {
      type: 'string'
    },
    vet: {
      type: 'boolean'
    },
    vet_times: {
      type: 'number',
      allowNull: true
    },
    vet_reasons: {
      type: 'string',
      allowNull: true
    },
    stop_living_with: {
      type: 'string'
    },
    age_at_time: {
      type: 'string'
    },
    why_stopped: {
      type: 'string'
    },
    another_dog: {  
      type: 'boolean'
    },
    why: {
      type: 'string'
    },

  },
  
  beforeCreate: async (values, proceed) => {
    try {
      values.id = uuidv4();
      return proceed();
    } catch (err) {
      return proceed(err);
    }
  }

};

