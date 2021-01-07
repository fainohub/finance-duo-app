import ApiService from './api.service'

const UserService = {

    get: async function() {
        return await ApiService.get('/users');
    },

};

export default UserService;
