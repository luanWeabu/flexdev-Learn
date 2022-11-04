const jwt = require("jsonwebtoken");

//Verify TOken
function verifyToken(req, res , next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undedined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        //set the token
        const token = bearer[1];

        jwt.verify(token, 'secretkey', (err, authData) =>{
            if(err){
                res.status(403).json(err);
            }else {
                req.roles = authData.roles;
            }
        })
        next();
    } else {
        res.sendStatus(401).json({message: "Unauthorized" })
    }
}
module.exports = verifyToken;
