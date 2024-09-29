const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        res.json({
            msg: "you are not authenticate try login",
            sucess: false
        })
    } else {
        jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
            if (decoded) {
                // console.log(decoded)
                req.body.user = decoded
                next()
            }else{
                res.send('wrong token')
            }
        });
    }
}

module.exports = auth;