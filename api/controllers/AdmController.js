/**
 * AdmController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    renderPage: async function(req, res) {
        try {
          const hadDogForms = await HadDogForm.find();
          const hasDogForms = await HasDogForm.find();
          const userForms = await UserForm.find();
          const neverHadForms = await NeverHadForm.find();
          const dontWantForms = await DontWantForm.find();
    
          return res.view('pages/telaAdm', {
            hadDogForms: hadDogForms,
            hasDogForms: hasDogForms,
            userForms: userForms,
            neverHadForms: neverHadForms,
            dontWantForms: dontWantForms
          });
        } catch (err) {
          return res.serverError(err);
        }
      },
      showAllResponses: async function(req, res) {
        try {
          const hadDogForms = await HadDogForm.find();
          const hasDogForms = await HasDogForm.find();
          const userForms = await UserForm.find();
          const neverHadForms = await NeverHadForm.find();
          const dontWantForms = await DontWantForm.find();
    
          return res.json({
            hadDogForms: hadDogForms,
            hasDogForms: hasDogForms,
            userForms: userForms,
            neverHadForms: neverHadForms,
            dontWantForms: dontWantForms
          });
        } catch (err) {
          return res.serverError(err);
        }
      },
};

