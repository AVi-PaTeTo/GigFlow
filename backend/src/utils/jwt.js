import jwt from "jsonwebtoken";

export const signAccessToken = (userId) => {
    return jwt.sign({sub: userId}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
}

export const signRefreshToken = (userId) => {
    return jwt.sign({sub: userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'})
}