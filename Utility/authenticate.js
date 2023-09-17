const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const secretKey = process.env.secretKey;

const User = require('../Models/User.model');

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            next(createError(401, 'unauthorized'));
            return;
        }

        jwt.verify(token, secretKey, async (err, user) => {
            if (err) {
                next(createError(403, "forbidden - invalid token"));
                return;
            }

            try {
                const result = await User.findOne({ uID: user.id });

                if (!result) {
                    next(createError(403, 'forbidden - user not found'));
                    return;
                }

                req.user = user;
                next();
            } catch (error) {
                next(error);
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = authenticate;