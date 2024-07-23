
require('../services/firebase');
const auth = require('firebase/auth');
const { default: firebase } = require('firebase/compat/app');



module.exports = {
    // Login com email e senha através do Firebase
    emailLogin: async function (req, res){
        let emailAddress = req.body.emailAddress;
        let password = req.body.password

        try {
            const result = await auth.signInWithEmailAndPassword(auth.getAuth(), emailAddress, password);
            const idToken = result._tokenResponse.idToken;
            return res.json(idToken);
        } 
        catch(err) {
            console.log(err);
            return res.status(500).json({err: err.message});
        }

    },

    // Cria um usuário novo no Firebase
    emailCadastro: async function (req, res){
        let emailAddress = req.body.emailAddress;
        let password = req.body.password;
    
        try{
          const result = await auth.createUserWithEmailAndPassword(auth.getAuth(),emailAddress, password);
          const idToken = result._tokenResponse.idToken;
    
          return res.json(idToken);
        } catch(erro){
          console.log(erro);
          return res.status(500).json({erro: erro.message});
        }
    },

    // Envia um email de redefinição de senha
    forgotPassword: async function (req, res){
        const authorization = auth.getAuth();
        auth.sendPasswordResetEmail(authorization, req.body.email)
        .then(() => {
            console.log("Email Sent!");
        })
        .catch((error) => {
            console.log(`${error.code}: ${error.message}`);
        })
    },

    // Verifica se o usuário está logado no site
    verifyLogin: async function(req, res){
        const token = req.body.token;
        try {
            const id = await sails.helpers.getUserId(token);
            if (!id) {
                return res.sendStatus(403);
            }
            return res.json({ userId: id });
        } catch (error) {
            return res.sendStatus(403);
        }
    }
    
};
  


