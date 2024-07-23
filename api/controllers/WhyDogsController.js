/**
 * WhyDogController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // Cria uma tabela no banco de dados
    create: async function (req, res) {
        try {
            const jwt = req.headers.authorization;
            const userId = await sails.helpers.getUserId(jwt);
            req.body.id_user = userId;
            const whyDog = await WhyDog.create(req.body);
            return res.json(whyDog);
        } catch (err) {
            return res.serverError(err);
        }
    },

    // Retorna todas as tabelas registradas
    list: async function (req, res) {
        try {
            const whyDog = await WhyDog.find();
            return res.json(whyDog);
        } catch (err) {
            return res.serverError(err);
        }
    },
};
