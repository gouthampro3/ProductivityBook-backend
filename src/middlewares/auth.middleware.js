const jwt = require("jsonwebtoken");

async function authorize(req, res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send({error:'Access Denied. No token provided.'});
    }
    try{
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(400).send({error:"Access Denied. Invalid Token."});
    }
}

module.exports = authorize;