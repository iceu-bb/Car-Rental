import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IBooking extends Document {
  bookingNumber: number;
  car: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  renterAge: string;
  telephoneNumber: number;
  days: number;
  startDay: string;
  returnDay: string;
  startHour: string;
  returnHour: string;
  totalDays: number;
  airlineCode: string;
  flightNumber: string;
  extras: [{ name: string; value: number }];
}

const BookingSchema: Schema = new Schema<IBooking>(
  {
    bookingNumber: {
      type: Number
    },
    car: {
      type: ObjectId,
      ref: 'Car',
      required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    renterAge: { type: String, required: true },
    telephoneNumber: { type: Number, required: true },
    days: { type: Number, required: true },
    startDay: { type: String, required: true },
    returnDay: { type: String, required: true },
    startHour: { type: String, required: true },
    returnHour: { type: String, required: true },
    totalDays: { type: Number, required: true },
    extras: [
      {
        name: { type: String, required: true },
        value: { type: Number, required: true }
      }
    ],
    airlineCode: { type: String },
    flightNumber: { type: String }
  },
  {
    timestamps: true
  }
);

// increment bookingNumber when new booking is created
BookingSchema.plugin(AutoIncrement, {
  inc_field: 'bookingNumber',
  start_seq: 373829
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
