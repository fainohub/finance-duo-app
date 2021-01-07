import ApiService from './api.service'

const ExpenseService = {

  create: async function(data) {
    return await ApiService.post('/expenses', data);
  },

  search: async function() {
    return await ApiService.get('/expenses');
  },

  categories: async function() {
    return await ApiService.get('/expenses/categories');
  },

};

export default ExpenseService;
