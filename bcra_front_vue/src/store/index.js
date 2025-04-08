import Vuex from 'vuex';
import axios from 'axios';

export default Vuex.createStore({
    state() {
        return {
            status: 'unauthenticated',
            access_token: '',
            refresh_token: ''
        }
    },
    mutations: {
        auth_in_progress (state) {
            state.status = "auth_in_progress",
            state.access_token = '',
            state.refresh_token = ''
        },
        auth_error (state) {
            state.status = "login_failed",
            state.access_token = '',
            state.refresh_token = ''
        },
        auth_success (state, {access_token, refresh_token}) {
            state.status = "login_success",
            state.access_token = access_token,
            state.refresh_token = refresh_token
        },
        logout (state) {
            state.status = "unauthenticated",
            state.access_token = '',
            state.refresh_token = ''
        }
    },
    actions: {
        login({commit}, data) {
            commit('auth_in_progress');
            return axios.post('/Login', data).then(res => {
               if (res.data.access_Token && res.data.refresh_Token) {
                var access_token = res.data.access_Token;
                var refresh_token = res.data.refresh_Token;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                commit('auth_success', {access_token, refresh_token});
                axios.defaults.headers.common["Authorization"] = 'Bearer ' + access_token;
               } 
            }).catch(e => {
                commit('auth_error');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                throw e;
            });
        },
        logout({commit}) {
            commit('logout');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delete axios.defaults.headers.common["Authorization"];
        },
        search({commit}, data) {
            return axios.get('/Main/' + data.cuit);
        }
    },
    getters: {
        login_status: state => state.status
    }
})