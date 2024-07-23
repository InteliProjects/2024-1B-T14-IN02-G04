/**
 * HasDogFormsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// Importar o modelo HasDogForm
const HasDogForm = require("../models/HasDogForm");

module.exports = {

    // Registra um formulário no banco de dados
    create: async function(req, res) {
        try {
            const jwt = req.headers.authorization;
            const userId = await sails.helpers.getUserId(jwt);
            req.body.user_id = userId;
            // Usar await com a função create() retorna uma Promise que pode ser aguardada
            const hasDogForm = await HasDogForm.create(req.body).fetch();
            return res.json({ message: "HasDogForm created successfully", data: hasDogForm });
        } catch (err) {
            // Se houver um erro, retornar uma resposta de erro
            return res.serverError(err);
        }

    },

    // Retorna todos os formulários já respondidos
    getAll: async function(req, res) {
        try {
            // Usar await com a função find() retorna uma Promise que pode ser aguardada
            const hasDogForms = await HasDogForm.find();
            return res.json(hasDogForms);
        } catch (err) {
            // Se houver um erro, retornar uma resposta de erro
            return res.serverError(err);
        }
    },
};
