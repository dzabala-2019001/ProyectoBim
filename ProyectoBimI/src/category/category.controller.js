'use strict'

import Category from './category.model.js'
import { checkUpdateCT } from '../utils/validator.js'

export const testC = (req, res)=>{
    console.log('test is runingsd')
    return res.send({message: 'test is running category'})
}

export const saveC = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message: `Registered succesfully, can be logged with name ${category.name}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering category', err: err})
    }
}

export const obtenerCT = async(req, res)=>{
    try {
        const category = await Category.find();
        return res.send(category)
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'error when recovering the category how sad :('})
    }
}

export const updateCT = async(req, res)=>{
    try {
        let { id } = req.params;
        let data = req.body;
        let updatedCategory = await Category.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        );
        if(!updatedCategory) return res.status(404).send({message: 'Category not found and not updated'});
        return res.send({message: 'Category updated', updatedCategory});    
    } catch (err) {
        console.error(err);
        if(err.keyValue && err.keyValue.name) return res.status(400).send ({message: `Category ${err.keyValue.name} is already taken`});
        return res.status(500).send({message: 'Error updating category'});
    }
}

export const searchC = async(req, res) => {
    try {
        let { search } = req.body
        let category = await Category.find({name: search})
        if(!category) return res.status(404).send({message: 'Category not found'})
        return res.send({message: 'category found', category})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error searching Category'})
    }
}

export const deleteC = async(req, res)=>{
    try {
        let { id } = req.params;
        let deletedCategory = await Category.findOneAndDelete({_id: id});
        if(!deletedCategory) return res.status(404).send({message: 'Category not found and not deleted'}); 
        return res.send({message: `Category with name ${deletedCategory.name} deleted successfully`});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error deleting Category'});
    }
}