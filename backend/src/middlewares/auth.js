const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env/environment'); 

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token não fornecido ou formato inválido." });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
};
