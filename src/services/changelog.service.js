import ApiService from './api.service'

const ChangelogService = {

    list: async function(pageNumber) {
        return await ApiService.get('/changelog' + '?page=' + pageNumber);
    },

};

export default ChangelogService;