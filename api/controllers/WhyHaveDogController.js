/**
 * WhyHaveDogController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // Cria uma tabela no banco de dados
  create: async (req, res) => {
    try {
      const userId = await sails.helpers.getUserId(req.headers.authorization);
      req.body.user_id = userId;
      const whyHaveDog = await WhyHaveDog.create(req.body).fetch();
      return res.json(whyHaveDog);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Retorna todas as tabelas registradas
  getAll: async function(req, res){
    try {
      const whyHaveDog = await WhyHaveDog.find();
      return res.json(whyHaveDog);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
