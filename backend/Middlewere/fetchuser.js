const jwt = require('jsonwebtoken');
const JWT_Secret = 'Iamaryabandhu';

// get the user from the jwt token and add id to request object
const fetchuser = (req , res , next)=>{
    try {
        // get token by the user 
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({error : "Please authentication the user !!"});
        }
        // verift jwt (Java Web Token) is basiclly used for verify the token
        const data =  jwt.verify( token , JWT_Secret); 
        req.user = data.user;

    } catch (error) {
        res.status(401).send({error : "Please authentication the user !!"});
    }
    next();
}

module.exports = fetchuser;