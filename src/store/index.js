import Vue from 'vue'
import Vuex from "vuex";
import auth from "./modules/auth";
import account from "./modules/account";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        auth,
        account
    }
});
