import express from 'express'
import { deletePr, obtenerP, registerP, search, test, updateP } from './products.controller.js';


const api = express.Router();

api.get('/test', test)
api.post('/registerP', registerP)
api.get('/obtenerP', obtenerP)
api.delete('/deletePr/:id', deletePr)
api.post('/search', search)
api.put('/updateP/:id', updateP)

export default api