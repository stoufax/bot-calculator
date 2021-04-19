import Mongoose, { Document } from "mongoose";

const botSchema = new Mongoose.Schema(
  {
    calculatedOperation: {
      type: Number,

      required: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model("Bot", botSchema);
