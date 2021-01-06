import ApiService from './api.service'

const ExpenseService = {

  create: async function(data) {
    return await ApiService.post('/expense', data);
  },

};

export default ExpenseService;
