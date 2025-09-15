import axios from 'axios'

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:3000";

const http = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

http.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error?.response?.data?.message || error?.message || 'Request failed'
        return Promise.reject(new Error(message))
    }
)

export const api = {
    getProfile: () => http.get('/auth/profile'),
    login: (payload) => http.post('/auth/login', payload),
    register: (payload) => http.post('/auth/register', payload),
    logout: () => http.post('/auth/logout'),

    getEntries: () => http.get('/entries'),
    createEntry: (payload) => http.post('/entries', payload),
    updateEntry: (id, payload) => http.patch(`/entries/${id}`, payload),
    deleteEntry: (id) => http.delete(`/entries/${id}`)
}

export { API_BASE };


