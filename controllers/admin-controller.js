const Hotel = require('../models/hotel-model');
const Room = require('../models/room-model');
const User = require('../models/user-model');
const { errorHandler } = require('../utils/error');

module.exports.getAllHotels = async (req, res, next) => {
    try {
      const allHotels = await Hotel.find({});
      if (!allHotels) {
        return next(errorHandler(404, 'Hotel not found!'));
      }
      res.status(200).json(allHotels);
    } catch (error) {
      next(error);
    }
};

module.exports.getAllRooms = async (req, res, next) => {
    try {
      const allRooms = await Room.find({});
      if (!allRooms) {
        return next(errorHandler(404, 'Room not found!'));
      }
      res.status(200).json(allRooms);
    } catch (err) {
      next(err);
    }
};

module.exports.getAllUsers = async (req,res,next)=>{
    try {
      console.log("get users")
      const allUsers = await User.find({});
      if (!allUsers) {
        return next(errorHandler(404, 'User not found!'));
      }
      res.status(200).json(allUsers);
    } catch (err) {
      next(err);
    }
}

module.exports.DeleteUserByAdmin = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been Deleted!');
    } catch (error) {
      next(error);
    }
  };

