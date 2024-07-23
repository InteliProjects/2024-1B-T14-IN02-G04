  /**
   * DontWantFormsController
   *
   * @description :: Server-side actions for handling incoming requests.
   * @help        :: See https://sailsjs.com/docs/concepts/actions
   */

  module.exports = {
    
    // Registra um formulário no banco de dados
    create: async (req, res) => {
      try {
        const jwt = req.headers.authorization;
        req.body.id_user = await sails.helpers.getUserId(jwt);

        sails.log(req.body);

        const dontWantForm = await DontWantForm.create(req.body)/*.fetch()*/;
        return res.json(dontWantForm);

      } catch (err) {
        return res.serverError(err);
      }
    },

    // Retorna todos os formulários respondidos
    getAll: async function (req, res) {
      try {
        const dontWantForms = await DontWantForm.find();
        return res.view("dontwantforms/list", { dontWantForms });
      } catch (err) {
        return res.serverError(err);
      }
    },

    // Atualiza um campo específico de um formulário existente
    update: async function (req, res) {
      try {
        if (req.body.reason) {
          req.body.reason = await sails.helpers.toLowerCase(req.body.reason);
        }

        await DontWantForm.update({ id: req.params.id }, req.body);
        return res.json({ message: "DontWantForm updated successfully" });
      } catch (err) {
        return res.serverError(err);
      }
    },
  };
