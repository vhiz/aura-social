const jwt = require('jsonwebtoken')
require('dotenv/config')

const verify = (req, res, next)=>{
    const authheaders = req.headers.authorization
    if(authheaders){
        const token = authheaders.split(' ')[1]
        jwt.verify(token, process.env.TOKEN, (err, user)=>{
            if(err){
                return res.status(403).json("token not valid")
            }
            req.user = user
            next()
        })
    }else{
        res.status(401).json('not authenticated')
    }
}