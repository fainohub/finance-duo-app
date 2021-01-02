import axios from 'axios'
import { StorageService } from '../services/storage.service'
import store from '../store'

const ApiService = {

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        axios.interceptors.response.use((response) => {
            return Promise.resolve(response.data);
        }, (error) => {
            switch (error.response.status) {
                case 401:
                    store.dispatch('auth/logout'); //Logout Event
                    break;
                case 422:
                    let errors = error.response.data.data;
                    let validationErrors = [];

                    for (let key in errors) {
                        if (Array.isArray(errors[key])){
                            for (let i = 0; i < errors[key].length; i++) {
                                validationErrors.push({
                                    'field' : key,
                                    'msg' : errors[key][i]
                                });
                            }
                        } else {
                            validationErrors.push({
                                'field' : key,
                                'msg' : errors[key]
                            });
                        }
                    }

                    return Promise.reject({
                        'errors' : validationErrors,
                    });
                default:
                    return Promise.reject(error.response);
            }
        })
    },

    setHeader() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${StorageService.getToken()}`;
    },

    removeHeader() {
        axios.defaults.headers.common = {};
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    postFile(resource, data) {
        return axios.post(resource, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
};

export default ApiService;