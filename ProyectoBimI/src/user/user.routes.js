import express from 'express'
import { deleteUs, loginU, registerU, testU, updateU } from './user.controller.js';

const api = express.Router();

//Rutas publicas
api.post('/registerU', registerU)
api.post('/loginU', loginU)


//Rutas privadas
api.get('/testU', testU)
api.put('/updateU/:id', updateU)
api.delete('/deleteUs/:id', deleteUs)

export default api