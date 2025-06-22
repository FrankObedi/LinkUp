import mongoose, { Schema, models, model } from "mongoose"

const ProfileSchema = new Schema({
  username: String,
  email: String,
  bio: String,
  skills: [String],
  interests: [String],
  goals: [String],
  timezone: String,
  experience: String,
  lookingFor: [String],
  avatar: String,
  connections: [
    {
      email: String, // the other user's email
      status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
      direction: { type: String, enum: ['sent', 'received'] }, // 'sent' if I sent, 'received' if I got
    }
  ],
}, { timestamps: true })

export default models.Profile || model("Profile", ProfileSchema)