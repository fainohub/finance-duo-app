import ApiService from './api.service'

const AccountService = {

    register: async function(data) {
        return await ApiService.post('/auth/register', data);
    },

    info: async function() {
        return await ApiService.get('/account');
    },

    update: async function(data) {
        return await ApiService.put('/account/update', data);
    },

    updateSocialLinks: async function(data) {
        return await ApiService.post('/account/social-links', data);
    },

    uploadLogo: async function(data) {
        return await ApiService.postFile('/account/upload/logo', data);
    },

    uploadCover: async function(data) {
        return await ApiService.postFile('/account/upload/cover', data);
    },

};

export default AccountService;
