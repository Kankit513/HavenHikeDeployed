const Booking = require('../models/booking-model');
const Hotel = require('../models/hotel-model');
const { errorHandler } = require('../utils/error');

module.exports.createBooking = async (req, res, next) => {
    
    const {
        hotelName,
        hotelId,
        bookingUserName,
        bookingUserId,
        checkInDate,
        checkOutDate,
        totalAmount,
        roomTitle,
        roomNumbers,
        // tokenGen
    } = req.body;

    try {
        const booking = new Booking({
          hotelName,
          hotelId,
          bookingUserName,
          bookingUserId,
          checkInDate,
          checkOutDate,
          totalAmount,
          roomTitle,
          roomNumbers,
          transactionId : "123456789"
        });
        const newBooking = await booking.save();
  
        const hotelUpdate = await Hotel.findOne({_id : hotelId});
        hotelUpdate.currentBooking.push({bookingId : newBooking._id, checkInDate : checkInDate, checkOutDate : checkOutDate, bookingUserId : bookingUserId, bookingUserName : bookingUserName, status : newBooking.status, roomTitle : roomTitle, roomNumbers : roomNumbers});
        await hotelUpdate.save();

        res.status(201).json(booking);
    } catch (error) {
      next(error)
    }
  };

module.exports.getBookingsByUserId = async(req,res,next) => {
    const userId= req.params.id;
    try {
      const bookings = await Booking.find({bookingUserId : userId});
      if(!bookings){
          return res.status(404).json({message: 'No booking found'})
      }
      res.status(201).json(bookings);
    } catch (error) {
        next(error);
    }
};