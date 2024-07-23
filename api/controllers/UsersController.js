
module.exports = {
  
  // Registra as credenciais do usuário no banco de dados local
  create: async function (req, res) {
    try {
      req.body.id = await sails.helpers.getUserId(req.headers.authentication);
      const user = await User.create(req.body).fetch();
      return res.json(user);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Retorna todos os usuários cadastrados no banco de dados local
  list: async (req, res) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Retorna um usuário específico pelo id
  getById: async function (req, res) {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        return res.notFound({ error: 'Usuário não encontrado.' });
      }
      return res.json(user);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Atualiza o número de telefone do usuário
  updatePhone: async function (req, res) {
    try {
      // Pega o ID do usuário e o novo número a partir dos parâmetros da requisição
      const userId = req.param('id');
      const newPhone = req.param('phone');

      // Valida se ambos os parâmetros foram fornecidos
      if (!userId || !newPhone) {
        return res.badRequest({ error: 'ID de usuário e novo número são necessários.' });
      }

      // Atualiza o número do usuário
      const updatedUser = await User.updateOne({ id: userId }).set({ phone: newPhone });

      // Se o usuário não for encontrado, retorna um erro
      if (!updatedUser) {
        return res.notFound({ error: 'Usuário não encontrado.' });
      }

      // Retorna o usuário atualizado
      return res.json(updatedUser);
    } catch (error) {
      return res.serverError(error);
    }
  },
};