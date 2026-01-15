import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
    const token = req.cookies.access

    if(!token) return res.status(401).json({ message: 'Unauthorized' })

    try{
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.userId = payload.sub;
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid Token.'})
    }
}

export const optionalAuth = (req, res, next) => {
    const token = req.cookies.access

    if (!token) {
        req.userId = null;
        return next();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.userId = payload.sub;
    } catch (err) {
        req.userId = null;
    }

    next();
}