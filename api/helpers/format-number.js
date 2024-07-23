//helper para formatar numero de celular
module.exports = {
  friendlyName: 'Format phone number',

  description: 'Formata o número para o seguinte formato: (99)99999-9999.',

  inputs: {
      phoneNumber: {
          type: 'string',
          required: true,
          description: 'The phone number string to format.'
      }
  },

  fn: async function (inputs) {
      // Remove todos os digitos que não são números
      let cleaned = inputs.phoneNumber.replace(/\D/g, '');

      // Só aceita números com 11 digitos
      if (cleaned.length !== 11) {
          throw new Error('O número deve ter 11 dígitos.');
      }

      // Formata o número para (99)99999-9999
      let formatted = `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
      
      return formatted;
  }
};
