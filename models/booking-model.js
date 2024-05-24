const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    hotelId: {
      type: String,
      required: true,
    },
    bookingUserName: {
      type: String,
      required: true,
    },
    bookingUserId: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    roomTitle: {
      type: [],
      required: true,
    },
    roomNumbers: {
      type: [],
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Booked'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
