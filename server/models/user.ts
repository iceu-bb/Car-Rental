import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  picture?: string;
  role: string;
  createdAd: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    picture: {
      type: String
    },

    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'root']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
