import mongoose, { InferSchemaType, Model } from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    attending: { type: String, enum: ["yes", "no"], required: true },
    plusOne: { type: String, enum: ["yes", "no"], required: true },
    message: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

rsvpSchema.index({ email: 1 }, { unique: true });

export type RsvpDocument = InferSchemaType<typeof rsvpSchema>;

export const Rsvp: Model<RsvpDocument> =
  (mongoose.models.Rsvp as Model<RsvpDocument>) ||
  mongoose.model<RsvpDocument>("Rsvp", rsvpSchema);
