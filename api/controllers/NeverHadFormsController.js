/**
 * NeverHadFormsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // REgistra um formulário no banco de dados
    create: async function (req, res) {
        try {
            const jwt = req.headers.authorization;
            const userId = await sails.helpers.getUserId(jwt);
            req.body.id_user = userId;
            const neverHadForm = await NeverHadForm.create(req.body).fetch();
            return res.json(neverHadForm);
        } catch (err) {
            return res.serverError(err);
        }
    },
};
