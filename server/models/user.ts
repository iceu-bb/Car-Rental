import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  picture?: string;
  role: string;
  createdAd: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  country?: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String
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
    },
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Other']
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    dateOfBirth: {
      type: String
    },
    country: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
