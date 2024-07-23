module.exports = {


  friendlyName: 'Get user id',


  description: 'Returns user id if verified',


  inputs: {
    webToken: {
      type: 'string',
      required: true,
      description: "JWT"
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'User id',
    },

  },


  fn: async function (inputs) {
    const { admin } = require('../services/firebase');
    const idToken = inputs.webToken;
      if (!idToken) {
        throw "No token provided!";
      }

      try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken.uid;
      }catch (err){
        console.error(err);
      }
      
    }


};

