const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use "decoded.id" or "decoded._id" based on how you created the token
    const user = await userModel.findById(decoded.id || decoded._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}