const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const { mockReq, mockRes } = require('sinon-express-mock');

// Mock Firebase Auth methods
const mockFirebaseAuth = {
  signInWithEmailAndPassword: sinon.stub(),
  createUserWithEmailAndPassword: sinon.stub(),
  sendPasswordResetEmail: sinon.stub(),
  getAuth: () => ({})
};

describe('AuthController', () => {
  let controller;
  let getUserIdStub;

  beforeEach(() => {
    getUserIdStub = sinon.stub();

    controller = proxyquire('../../api/controllers/AuthController', {
      'firebase/auth': mockFirebaseAuth,
      sails: {
        helpers: {
          getUserId: getUserIdStub
        }
      }
    });
  });

  afterEach(() => {
    sinon.restore();
    // Reset the stubs after each test
    mockFirebaseAuth.signInWithEmailAndPassword.reset();
    mockFirebaseAuth.createUserWithEmailAndPassword.reset();
    mockFirebaseAuth.sendPasswordResetEmail.reset();
  });

  describe('emailLogin', () => {
    it('Deve fazer login com sucesso', async () => {
      const req = mockReq({ body: { emailAddress: 'test@example.com', password: 'password123' } });
      const res = mockRes();
      const idToken = 'testToken';
      mockFirebaseAuth.signInWithEmailAndPassword.resolves({ _tokenResponse: { idToken } });

      await controller.emailLogin(req, res);

      assert(mockFirebaseAuth.signInWithEmailAndPassword.calledOnce);
      assert(mockFirebaseAuth.signInWithEmailAndPassword.calledWith({}, 'test@example.com', 'password123'));
      assert(res.json.calledOnceWith(idToken));
    });

    it('Deve retornar erro ao fazer login', async () => {
      const req = mockReq({ body: { emailAddress: 'test@example.com', password: 'password123' } });
      const res = mockRes();
      const errorMessage = 'Login failed';
      mockFirebaseAuth.signInWithEmailAndPassword.rejects(new Error(errorMessage));

      await controller.emailLogin(req, res);

      assert(mockFirebaseAuth.signInWithEmailAndPassword.calledOnce);
      assert(mockFirebaseAuth.signInWithEmailAndPassword.calledWith({}, 'test@example.com', 'password123'));
      assert(res.status.calledOnceWith(500));
      assert(res.json.calledOnceWith({ err: errorMessage }));
    });
  });

  describe('emailCadastro', () => {
    it('Deve cadastrar um novo usuário com sucesso', async () => {
      const req = mockReq({ body: { emailAddress: 'test@example.com', password: 'password123' } });
      const res = mockRes();
      const idToken = 'testToken';
      mockFirebaseAuth.createUserWithEmailAndPassword.resolves({ _tokenResponse: { idToken } });

      await controller.emailCadastro(req, res);

      assert(mockFirebaseAuth.createUserWithEmailAndPassword.calledOnce);
      assert(mockFirebaseAuth.createUserWithEmailAndPassword.calledWith({}, 'test@example.com', 'password123'));
      assert(res.json.calledOnceWith(idToken));
    });

    it('Deve retornar erro ao cadastrar usuário', async () => {
      const req = mockReq({ body: { emailAddress: 'test@example.com', password: 'password123' } });
      const res = mockRes();
      const errorMessage = 'Cadastro failed';
      mockFirebaseAuth.createUserWithEmailAndPassword.rejects(new Error(errorMessage));

      await controller.emailCadastro(req, res);

      assert(mockFirebaseAuth.createUserWithEmailAndPassword.calledOnce);
      assert(mockFirebaseAuth.createUserWithEmailAndPassword.calledWith({}, 'test@example.com', 'password123'));
      assert(res.status.calledOnceWith(500));
      assert(res.json.calledOnceWith({ erro: errorMessage }));
    });
  });

  describe('forgotPassword', () => {
    it('Deve enviar email de recuperação de senha com sucesso', async () => {
      const req = mockReq({ body: { email: 'test@example.com' } });
      const res = mockRes();
      mockFirebaseAuth.sendPasswordResetEmail.resolves();

      await controller.forgotPassword(req, res);

      assert(mockFirebaseAuth.sendPasswordResetEmail.calledOnce);
      assert(mockFirebaseAuth.sendPasswordResetEmail.calledWith({}, 'test@example.com'));
      assert(res.sendStatus.notCalled);
    });

    it('Deve retornar erro ao enviar email de recuperação de senha', async () => {
        const req = mockReq({ body: { email: 'test@example.com' } });
        const res = mockRes();
        const errorMessage = 'Reset email failed';
        mockFirebaseAuth.sendPasswordResetEmail.rejects(new Error(errorMessage));
      
        await controller.forgotPassword(req, res);
      
        assert(mockFirebaseAuth.sendPasswordResetEmail.calledOnce);
        assert(mockFirebaseAuth.sendPasswordResetEmail.calledWith({}, 'test@example.com'));
        assert(res.status.calledOnceWith(500));
        assert(res.json.calledOnceWith({ error: errorMessage }));
      });
      
  });

  describe('verifyLogin', () => {
    it('Deve verificar o login com sucesso', async () => {
        const req = mockReq({ body: { token: 'testToken' } });
        const res = mockRes();
        getUserIdStub.resolves('userId123');
      
        await controller.verifyLogin(req, res);
      
        assert(getUserIdStub.calledOnce);
        assert(getUserIdStub.calledWith('testToken'));
        assert(res.json.calledOnceWith({ userId: 'userId123' }));
        assert(res.sendStatus.notCalled);
      });

    it('Deve retornar 403 se a verificação de login falhar', async () => {
      const req = mockReq({ body: { token: 'testToken' } });
      const res = mockRes();
      getUserIdStub.resolves(null);

      await controller.verifyLogin(req, res);

      assert(getUserIdStub.calledOnce);
      assert(res.sendStatus.calledOnceWith(403));
    });

    it('Deve retornar 403 se ocorrer um erro', async () => {
      const req = mockReq({ body: { token: 'testToken' } });
      const res = mockRes();
      getUserIdStub.rejects(new Error('Verification failed'));

      await controller.verifyLogin(req, res);

      assert(getUserIdStub.calledOnce);
      assert(res.sendStatus.calledOnceWith(403));
    });
  });
});
