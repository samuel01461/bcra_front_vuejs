import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/index';
import router from './router/index';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = "https://localhost:7240/api";

var token = localStorage.getItem('access_token');
if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

//codigo stackoverflow
axios.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const res = await axios.get('/Login/' + refreshToken );
  
          const newToken = res.data.token;
          const newRefresh = res.data.refresh_token;
  
          localStorage.setItem('access_token', newToken);
          localStorage.setItem('refresh_token', newRefresh);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
  
          return axios(originalRequest); 
        } catch (err) {
          store.dispatch('logout');
          router.push('/login');
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  createApp(App).use(store).use(router).mount('#app')
