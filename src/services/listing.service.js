import ApiService from './api.service'

const ListingService = {

    get: async function(listingId) {
        return await ApiService.get('/catalog/listings/' + listingId);
    },

    mockup: async function(data) {
      return await ApiService.post('/catalog/mockup/generate', data);
    },

    list: async function(pageNumber, query = '') {
        return await ApiService.get('/catalog/listings?q=' + query + '&page=' + pageNumber);
    },

    types: async function() {
        return await ApiService.get('/catalog/types');
    },

    store: async function(data) {
        return await ApiService.post('/catalog/listings', data);
    },

    update: async function(listingId, data) {
        return await ApiService.put('/catalog/listings/' + listingId, data);
    },

    delete: async function(listingId) {
        return await ApiService.delete('/catalog/listings/' + listingId);
    },

    total: async function() {
        return await ApiService.get('/reports/listings');
    },

};

export default ListingService;
