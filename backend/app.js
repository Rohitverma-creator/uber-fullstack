const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");

const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");

connectToDb();

const app = express();

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://<your-vercel-project>.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);
app.get("/", (req, res) => {
  res.send("Backend deployed successfully 🚀");
});


module.exports = app;
