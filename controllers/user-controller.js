const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const User = require('../models/user-model');
const Hotel = require('../models/hotel-model');

module.exports.test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

module.exports.updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id){
    return next(errorHandler(401, 'You can only update your own account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id){
    return next(errorHandler(401, 'You can only delete your own account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been Deleted!');
  } catch (error) {
    next(error);
  }
};

module.exports.getUserHotels = async (req, res, next) => {
  // if (req.user.id === req.params.id) {
    try {
      const hotels = await Hotel.find({ userRef: req.params.id });
      res.status(200).json(hotels);
    } catch (error) {
      next(error);
    }
  // }
  //  else {
    return next(errorHandler(401, 'You can only view your own Hotels!'));
  // }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, 'User not Found!'));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req,res,next)=>{
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}