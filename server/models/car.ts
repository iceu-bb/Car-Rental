import mongoose, { Schema } from 'mongoose';

const CarSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Mini', 'Compact', 'Economy', 'Intermediate', 'SUV', 'Van'],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  passengers: {
    type: Number,
    required: true
  },
  baggages: {
    type: Number,
    required: true
  },
  doors: {
    type: Number,
    required: true
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    required: true
  },
  propulsion: {
    type: String,
    enum: ['Front Wheel Drive', '4 Wheel Drive'],
    required: true
  },
  incineration: {
    type: Number
  },
  airconditioning: {
    type: Boolean,
    default: false
  },
  ABS: {
    type: Boolean,
    default: false
  },
  USB: {
    type: Boolean,
    default: false
  },
  powerWindows: {
    type: Boolean,
    default: false
  },
  remoteLocking: {
    type: Boolean,
    default: false
  },
  Bluetooth: {
    type: Boolean,
    default: false
  },
  cruiseControl: {
    type: Boolean,
    default: false
  },
  electricCar: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Car', CarSchema);
