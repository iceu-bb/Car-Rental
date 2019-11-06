import mongoose, { Schema } from 'mongoose';

const CarSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  group: {
    type: String,
    required: true
  }
});

export default mongoose.model('Car', CarSchema);
