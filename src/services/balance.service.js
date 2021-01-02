import ApiService from './api.service'

const BalanceService = {

    getCommissions: async function(pageNumber) {
        return await ApiService.get('/balance/commissions' + '?page=' + pageNumber);
    },

    getBalance: async function() {
        return await ApiService.get('/balance');
    },

};

export default BalanceService;