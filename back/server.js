const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const cookieParser = require("cookie-parser");
const categoriesRoutes = require("./routes/categories.routes");
const userRoutes = require("./routes/user.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};
//!Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("*", checkUser);

//!routes

app.use("/api/", categoriesRoutes);
app.use("/api/user", userRoutes);

//!server
app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
