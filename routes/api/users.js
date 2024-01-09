const express = require('express')
const router = express.Router()
const User = require('../../models/User')

//* create a user
router.post('/', async(req, res) =>{
    const userObj = {
        fname: req.body.fname,
        lname: req.body.lname,
    }
    const user = new User(userObj)
    await user.save()
    res.status(201).json(user)
})

//* get all users
router.get('/', async(req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
})

//* get one user
router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if(user){
            res.json(user)
        }else{
            res.status(404).json({message: 'User Not Found.'})
        }  
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
})

//* Update One User
router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const userBody = req.body
        const newUser = await User.findByIdAndUpdate(id, userBody, {new: true})
        if(newUser){
            res.json(newUser)
        }else{
            res.status(404).json({message: "User not found."})
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
})

//* Delete a user
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id)
        if(deletedUser){
            res.json({message: 'The user is deleted'})
        }else{
            res.status(404).json({message: "User not found."})
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
        
    }
})

module.exports = router