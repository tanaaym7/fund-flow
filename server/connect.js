import mongoose from "mongoose";

mongoose.set("strictQuery", false);

async function connectToMongoDB(mongoURI) {
  return mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
    });
}

export default connectToMongoDB;
