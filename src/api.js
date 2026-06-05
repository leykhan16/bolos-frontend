import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export const getServices = () => api.get('/services')
export const createBooking = (data) => api.post('/bookings', data)
export const sendMessage = (data) => api.post('/contact', data)
