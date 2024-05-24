const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error');


module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, 'You are not Authenticated!'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Token is not Valid!'));

    req.user = user;
    next();
  });
};

module.exports.verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(errorHandler(403, "You are not Authorized!"));
    }
};

module.exports.verifyAdmin = (req, res, next) => {
  console.error("verifying admin")
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not Authorized!"));
    } else {
      next();
    }
};