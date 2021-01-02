import AccountService from '../../services/account.service';

const state =  {
    user: {
        challenge_status: {
            five_products: false,
            cover_image: false,
            logo_image: false,
            share_studio: false
        },
        studio: {
            shopify_url: null
        }
    }
};

const getters = {
    user: (state, getters, rootState) => {
        return state.user;
    }
};

const actions = {
    getUser({ commit, state }) {
        AccountService.info().then(response => {
            commit('setUser', response.data.user);
        });
    },

    setUser({ commit, state }, user) {
        commit('setUser', user);
    }
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
