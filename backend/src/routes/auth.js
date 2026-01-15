import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { requireAuth } from '../middlewares/auth.middleware.js';

import { signAccessToken, signRefreshToken } from '../utils/jwt.js'
import { accessCookieOptions, refreshCookieOptions } from '../utils/cookie.js';

const router = express.Router()

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body
    const existing = await User.findOne({email});

    if(existing) return res.status(400).json({ message: "Email already registered."})
    
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({name, email, password: hashed})

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    res
        .cookie('access', accessToken, accessCookieOptions)
        .cookie('refresh', refreshToken, refreshCookieOptions)
        .status(201)
        .json({ message: "Registered successfully."})
})


router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({email}).select("+password")
    if(!user) return res.status(401).json({ message: "Invalid Credentials."})
    const valid = await bcrypt.compare(password, user.password)
    if(!valid) return res.status(401).json({ message: "Invalid Credentials."})
    
    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    res
        .cookie('access', accessToken, accessCookieOptions)
        .cookie('refresh', refreshToken, refreshCookieOptions)
        .json({ message: "Login successfull."})
})

router.post('/refresh', (req, res) => {
    const token = req.cookies.refres;
    if(!token) return res.status(401).json({ message: 'Unauthorized' })

    try{
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        const newToken = signAccessToken(payload.sub)

        res
            .cookie('access', newToken, accessCookieOptions)
            .json({message:'Token refreshed'})
    } catch {
        return res.status(401).json({message: "Invalid refresh token."})
    }
})

router.post('/logout', (req, res) => {
    res
        .clearCookie('access')
        .clearCookie('refresh')
        .json({message: 'Logged out successfully.'})
})

router.get("/me", requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("_id name email");

        if (!user) return res.status(401).json({ message: "User not found" });

        res.json({
                    id: user._id,
                    username: user.name,
                    email: user.email,
                });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;