import ApiService from './api.service';
import { StorageService } from './storage.service';

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  login: async function (email, password) {
    try {
      const requestData = {
        email: email,
        password: password
      };

      const response = await ApiService.post('/auth/login', requestData);

      let user = response.data.user;
      let token = response.data.token;

      if(user.status === 2) {
         return null;
      }

      this.loginUser(token);

      return token;
    } catch (error) {
      throw new AuthenticationError('', error.errors[0].msg);
    }
  },

  socialLogin: async function (firebase_auth_id, firebase_auth_provider) {
    try {
      const requestData = {
        firebase_auth_id: firebase_auth_id,
        firebase_auth_provider: firebase_auth_provider
      };

      const response = await ApiService.post('/auth/social-login', requestData);

      let user = response.data.user;
      let token = response.data.token;

      if(user.status === 2) {
         return null;
      }

      this.loginUser(token);

      return token;
    } catch (error) {
      throw new AuthenticationError('', error.errors[0].msg);
    }
  },

  loginUser(token) {
    StorageService.saveToken(token);
    ApiService.setHeader();
  },

  logout() {
    StorageService.removeToken();
    ApiService.removeHeader();
  },
};

export {UserService, AuthenticationError}
