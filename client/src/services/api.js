import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const fetchRooms = () => api.get('/rooms');
export const allocateRoom = (payload) => api.post('/allocate', payload);
export const login = (payload) => api.post('/auth/login', payload);
