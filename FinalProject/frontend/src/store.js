import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            // id: 1,
            // name: "Test",
            // email: "test@email.com",
            // profiles: [
            //     { name: "admin" }
            // ],
            // token: 'abc123'
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    actions: {
        setUser({ commit }, user) {
            if (user && user.token) localStorage.setItem('token', user.token)
            else localStorage.removeItem('token');

            commit('setUser', user);
        }
    }
});