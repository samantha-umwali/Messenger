const router= require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../Models/User')

// REGISTER
router.post("/register", async (req, res) => {
    const {username, email, password} = req.body
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        
        //create new user
        const newUser = new User({username, email, password: hashedPassword})

        //Save user and return response
        const user = await newUser.save()
        res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json(error)
    }
});
module.exports = router