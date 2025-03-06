import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    Subscriber: [
      //one who is subscribing
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    channel: {
      type: mongoose.Schema.Types.ObjectId, //one who is being subscribed
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
