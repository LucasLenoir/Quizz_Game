const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const cookieParser = require("cookie-parser");
const categoriesRoutes = require("./routes/categories.routes");
const userRoutes = require("./routes/user.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

//!Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(checkUser);
// app.use("/", requireAuth, (req, res) => {
//   console.log(res.lcals.user);
//   res.status(200).json(res.olocals.user);
// });

//!routes
app.use("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  next();
});
app.use("/api/", categoriesRoutes);
app.use("/api/user", userRoutes);

//!server
app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
