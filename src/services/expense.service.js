import ApiService from './api.service'

const ExpenseService = {

  create: async function(data) {
    return await ApiService.post('/expense', data);
  },

  categories: async function() {
    return await ApiService.get('/expense/categories');
  },

};

export default ExpenseService;
