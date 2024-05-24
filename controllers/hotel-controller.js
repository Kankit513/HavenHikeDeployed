const Hotel = require('../models/hotel-model');
const Room = require('../models/room-model');
const { errorHandler } = require('../utils/error');

module.exports.createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    return res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteHotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(errorHandler(404, 'Hotel not found!'));
  }
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted!');
  } catch (error) {
    next(error);
  }
};

module.exports.updateHotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(errorHandler(404, 'Hotel not found!'));
  }
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

module.exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return next(errorHandler(404, 'Hotel not found!'));
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

module.exports.getHotels = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let cctv = req.query.cctv;
    if (cctv === undefined || cctv === 'false') {
      cctv = { $in: [false, true] };
    }

    let wifi = req.query.wifi;
    if (wifi === undefined || wifi === 'false') {
      wifi = { $in: [false, true] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';
    
    const hotels = await Hotel.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      cctv,
      wifi,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

module.exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

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