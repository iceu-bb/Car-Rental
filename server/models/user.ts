import mongoose, { Schema, Document } from "mongoose";

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
  countryOfBirth?: string;
  telephoneNumber?: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  region?: string;
  postcode?: string;
  country?: string;
  newsletterCheck?: boolean;
  emailCheck?: boolean;
  smsCheck?: boolean;
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
      default: "user",
      enum: ["user", "admin", "root"]
    },
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss", "Dr", "Ms", "Other"]
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
    countryOfBirth: {
      type: String
    },
    telephoneNumber: {
      type: Number
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String
    },
    region: {
      type: String
    },
    postcode: {
      type: String
    },
    country: {
      type: String
    },
    newsletterCheck: {
      type: Boolean
    },
    emailCheck: {
      type: Boolean
    },
    smsCheck: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>("User", UserSchema);
