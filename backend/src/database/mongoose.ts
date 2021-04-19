import mongoose from "mongoose";

const mongodb = "mongodb://localhost:27017/bot-db";

mongoose
  .connect(mongodb, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    process.exit(1);
  });
