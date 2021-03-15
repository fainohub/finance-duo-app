import ApiService from './api.service'

const UserService = {

  get: async function() {
      return await ApiService.get('/users');
  },

  groups: async function() {
    return await ApiService.get('/groups');
  },

};

export default UserService;
