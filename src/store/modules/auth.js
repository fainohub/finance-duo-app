import { AuthService, AuthenticationError } from '@/services/auth.service'
import { StorageService } from '@/services/storage.service'
import router from '../../routes/router'

const state =  {
    authenticating: false,
    accessToken: StorageService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: null
};

const getters = {
    loggedIn: (state, getters, rootState) => {
        return !!state.accessToken;
    },

    authenticationErrorCode: (state, getters, rootState) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state, getters, rootState) => {
        return state.authenticationError
    },

    authenticating: (state, getters, rootState) => {
        return state.authenticating
    }
};

const actions = {
    async login({ commit }, {email, password}) {
        commit('loginRequest');

        try {
            const token = await AuthService.login(email, password);

            if (token === null) {
              throw new AuthenticationError(403,`Your account has been suspended. <a href="mailto:contact@artishup.com">Contact us</a> for more information.`)
            }

            commit('loginSuccess', token);

            router.push(router.history.current.query.redirect || '/dashboard?welcome=true');

            return true;
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message});
            }

            return false;
        }
    },

    async socialLogin({ commit }, {firebase_auth_id, firebase_auth_provider}) {
        commit('loginRequest');

        try {
            const token = await AuthService.socialLogin(firebase_auth_id, firebase_auth_provider);

            if (token === null) {
                throw new AuthenticationError(403,`Your account has been suspended. <a href="mailto:contact@artishup.com">Contact us</a> for more information.`)
            }

            commit('loginSuccess', token);

            router.push(router.history.current.query.redirect || '/dashboard');

            return true;
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message});
            }

            return false;
        }
    },

    loginUser({ commit }, { token }) {
        commit('loginRequest');

        try {
            AuthService.loginUser(token);

            commit('loginSuccess', token);

            router.push(router.history.current.query.redirect || '/dashboard');

            return true;
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message});
            }

            return false;
        }
    },

    logout({ commit }) {
        AuthService.logout();
        commit('logoutSuccess');
        router.push('/');
    }
};

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = null;
        state.authenticationErrorCode = 0;
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken;
        state.authenticating = false;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.authenticationErrorCode = errorCode;
        state.authenticationError = errorMessage;
    },

    logoutSuccess(state) {
        state.accessToken = '';
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
