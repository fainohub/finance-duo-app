import ApiService from './api.service'

const SalesService = {

    list: async function(pageNumber) {
        return await ApiService.get('/sales' + '?page=' + pageNumber);
    },

    total: async function() {
        return await ApiService.get('/reports/sales');
    },

    chart: async function() {
        return await ApiService.get('/reports/sales/chart/sales-by-period');
    },

};

export default SalesService;