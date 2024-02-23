import express from 'express'
import { deleteC, obtenerCT, saveC, searchC, testC, updateCT } from './category.controller.js';


const api = express.Router();

api.get('/testC', testC)
api.post('/saveC', saveC)
api.get('/obtenerCT', obtenerCT)
api.put('/updateCT/:id', updateCT)
api.post('/searchC', searchC)
api.delete('/deleteC/:id', deleteC)

export default api