module.exports = {

    // Cria uma tabela no banco de dados
    create: async function (req, res) {
        try {
            const userId = await sails.helpers.getUserId(req.headers.authorization);
            req.body.id_user = userId;
            const otherPet = await OtherPet.create(req.body).fetch(); // Corrigido
            return res.json(otherPet);
        } catch (err) {
            return res.serverError(err);
        }
    },

};