import express from "express";
import connectToMongoDB from "./connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRoutes.js";

const app = express();
const PORT = 8001;

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Add this line to include credentials
  })
);

//middlewares
app.use(express.json());
app.use(cookieParser());
//connection to mongodb
connectToMongoDB("mongodb://localhost:27017/paytm-user");

//api routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.get("/", (req, res) => {
  res.send("Welcome to My Website");
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
