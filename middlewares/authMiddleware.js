const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
    
        jwt.verify(req.token,process.env.TOKEN_SECRET,(error, authData) =>{
            if(error){
                res.sendStatus(403);
            }else{
                req.usuario = authData.usuario;
                next();
            }
        });
    
    
    }else{
        res.sendStatus(403);
    }


}

module.exports = authMiddleware;

