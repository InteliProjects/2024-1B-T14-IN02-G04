module.exports.routes = {
  '/': { view: 'pages/homepage' },
  '/pages': { view: 'pages/pages' },
  '/login': { view: 'pages/login' },
  '/formspast': {view: 'pages/past_form'},  
  '/formsresenha': { view: 'pages/forms_resenha' },
  '/signup': { view: 'pages/sign_up' },
  '/nullform' : { view: 'pages/null_form' },
  '/forms-future' : { view: 'pages/forms-future' },
  '/forms-presente' : { view: 'pages/formsPresente' },
  '/end': { view: 'pages/end' },
  '/forgotPassword': { view: 'pages/forgotPassword' },
  '/check': { view: 'pages/check_forms'},
  '/contato' : { view: 'pages/telaContatos' },
  
  //login
  'POST /authLogin': 'AuthController.emailLogin',
  'POST /authCadastro': 'AuthController.emailCadastro',
  'POST /authForget': 'AuthController.forgotPassword',
  'POST /authValidation': 'AuthController.verifyLogin',

  //UserFormsController
  'POST /userForms': 'UserFormsController.create',
  'GET /userForms': 'UserFormsController.getAll',
  'GET /userForms/:id': 'UserFormsController.getById',
  'DELETE /userForms/:id': 'UserFormsController.delete',
  'PUT /userForms/:id': 'UserFormsController.update',
  
  'GET /adm/showAllResponses': 'AdmController.showAllResponses',
  'GET /telaAdm': 'AdmController.renderPage',

  //UsersController
  "POST /users": "UsersController.create",
  "GET /users": "UsersController.list",
  "GET /users/:id": "UsersController.getById",
  "PUT /users/password/:id/:password": "UsersController.updatePassword",
  //"PUT /users/email/:id": "UsersController.updateEmail",

  //ContactsController
  "POST /contact": "ContactsController.create",
  "GET /contact": "ContactsController.list",
  "GET /contact/id/:id": "ContactsController.getById",
  "PUT /contact/:id_users": "ContactsController.updatePhone",
  //'GET /format-phone-number': 'UserController.formatPhoneNumber',

  //HasDogFormsController
  'POST /has_dog_form': 'HasDogFormController.create',
  'GET /has_dog_form/getAll': 'HasDogFormsController.getAll',
  'GET /has_dog_form/getById/:id': 'HasDogFormsController.getById',
  'PUT /has_dog_form/update/:id': 'HasDogFormsController.update',

  //HadDogFormsConstroller
  'POST /had_dog_form/create': 'HadDogFormsController.create',
  'GET /had_dog_form/getAll': 'HadDogFormsController.getAll',
  'GET /had_dog_form/getById/:id': 'HadDogFormsController.getById',
  'PUT /had_dog_form/update/:id': 'HadDogFormsController.update',

  //DontWantFormsController
  'POST /dontWantForm/create': 'DontWantFormsController.create',
  'GET /dontWantForm/getAll': 'DontWantFormsController.getAll',
  'PUT /dontWantForm/update/:id': 'DontWantFormsController.update',

  //WhyHaveDogController
  'POST /whyHaveDog/create': 'WhyHaveDogController.create',
  'GET /whyHaveDog/getAll': 'WhyHaveDogController.getAll',

  //WhyDogController
  'POST /whyDog': 'WhyDogController.create',
  'GET /whyDog': 'WhyDogController.list',
  'GET /whyDog/:id': 'WhyDogController.getById',
  'PUT /whyDog/:id': 'WhyDogController.update',
  'DELETE /whyDog/:id': 'WhyDogController.delete',

  //OtherPetController
  'POST /otherPet': 'OtherPetsController.create',

  //NeverHadFormController

  'POST /neverHadForm': 'NeverHadFormsController.create',
  'GET /neverHadForm': 'NeverHadFormsController.list',
  'GET /neverHadForm': 'NeverHadFormsController.getById',
  'PUT /neverHadForm/:id': 'NeverHadFormsController.update',
  'DELETE /neverHadForm/:id': 'NeverHadFormsController.delete',

};