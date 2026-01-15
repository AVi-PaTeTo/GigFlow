import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
const router = express.Router();


router.get('/', async (req, res)=> {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit).select("+password");
        res.json({page, limit, skip, results: users})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req, res) => {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try{
        const newUser = await user.save()
        const { password: _, ...userData } = newUser.toObject();
        res.status(201).json(userData);
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({message: 'User not found.'})
        
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found.'})
        
        await user.remove()
        res.json({message: 'User deleted.'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;