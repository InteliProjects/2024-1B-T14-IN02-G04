module.exports = {
  
    // Registra um formulário no banco de dados
    create: async function (req, res) {
      try {

          const jwt = req.headers.authorization;
          const userId = await sails.helpers.getUserId(jwt);
          req.body.id_user = userId;

          // Criar o contato com o número de telefone formatado
          const contact = await Contact.create(req.body).fetch();
          return res.json(contact);
      } catch (err) {
          return res.serverError(err);
      }
    },

    // Retorna todos os formulários respondidos
    list: async (req, res) => {
        const contact = await Contact.find();
        return res.json(contact);
    },
};

