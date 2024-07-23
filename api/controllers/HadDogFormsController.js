/**
 * HadDogFormsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  // Registra um formulário no banco de dados
  create: async (req, res) => {
      try {
        const jwt = req.headers.authorization;
        const userId = await sails.helpers.getUserId(jwt);
        req.body.id_user = userId;
        const hadDogForm = await HadDogForm.create(req.body);
        return res.json(hadDogForm);
      } catch (err) {
        return res.serverError(err);
      }
      
  },

  // Retorna uma resposta específico pelo id
  getById: async function (req, res) {
      try {
          const hadDogForm = await HadDogForm.findOne({ id: req.params.id });
          if (!hadDogForm) return res.notFound();
          return res.json(hadDogForm);
      } catch (err) {
          return res.serverError(err);
      }
  },

  // Atualiza um campo específico de um formulário existente
  update: async function (req, res) {
      try {
          await HadDogForm.update({ id: req.params.id }, req.body);
          return res.json({ message: "HadDogForm updated successfully" });
      } catch (err) {
          return res.serverError(err);
      }
  },

  // Retorna todos os formulários respondidos
  getAll: async function(req, res){
      try {
          const hadDogForms = await HadDogForm.find();
          return res.json(hadDogForms);
      } catch (err) {
          return res.serverError(err);
      }
  },
};
