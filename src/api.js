import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bolos-api-production.up.railway.app/api'
})

export const getServices = () => api.get('/services')
export const createBooking = (data) => api.post('/bookings', data)
export const sendMessage = (data) => api.post('/contact', data)
