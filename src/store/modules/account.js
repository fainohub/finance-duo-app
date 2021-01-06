import UserService from '../../services/user.service';

const state =  {
    user: { }
};

const getters = {
    user: (state, getters, rootState) => {
        return state.user;
    }
};

const actions = {
    getUser({ commit, state }) {
        UserService.get().then(response => {
            commit('setUser', response.user);
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
