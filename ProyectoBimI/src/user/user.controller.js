'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdateU } from '../utils/validator.js'

export const testU = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const registerU = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save() 
        return res.send({message: `Registered successfully, can be logged with username ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const loginU = async(req, res)=>{
    try{
        let { username, password } = req.body
        let user = await User.findOne({username}) 
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser})
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const updateU = async(req, res)=>{
    try { 
        let { id } = req.params
        let data = req.body
        let update = checkUpdateU(data, id)
        if(!update)return res.status(400).send({message: 'Have submitted some data that canot be update'})
        let updatedUser = await User.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedUser) ReadableByteStreamController.status(401).send({message: 'User not found  and not update'})
        return res.send({message: 'Update user', updatedUser})    
    } catch (error) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send ({message: `Username ${err.keyValue.username} is alredy taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteUs = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedUser = await User.findOneAndDelete({_id: id}) 
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
