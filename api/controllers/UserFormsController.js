/**
 * UserFormsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  // Registra um formulário no banco de dados
  create: async function(req, res) {
    sails.log(req.body)
    try {
      const jwt = req.headers.authorization;
      req.body.id_user = await sails.helpers.getUserId(jwt);
      const newUserForm = await UserForm.create(req.body);
      return res.json({ message: "User form created successfully", userForm: newUserForm });
    } catch (err) {
      return res.serverError(err);
    }
  },  

  
};