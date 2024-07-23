module.exports = {
  friendlyName: 'To Lower Case',
  description: 'Converte um input do tipo string para lower case',
  inputs: {
      input: {
          type: 'string',
          required: true,
          description: 'A string a ser colocada para ir para lower case',
      },
  },
  exits: {
      success: {
          description: 'Retorna a string em lower case',
      },
  },

  fn: function (inputs) {
      // Convert the input to lower case
      const lowerCaseInput = inputs.input.toLowerCase();
      return this.exits.success(lowerCaseInput);
  },
};