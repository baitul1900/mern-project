const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let Token = req.headers['token'];

    jwt.verify(Token, "Secret125A", function (err, decoded) {
        if (err) {
            res.json({ status: "Unauthorized" })
        } else {
            let userId = decoded['userId'];
            console.log(userId);
            req.headers.userId = userId;
            next();
        }
    })
};