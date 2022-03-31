const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const cookieParser = require("cookie-parser");
const categoriesRoutes = require("./routes/categories.routes");
const userRoutes = require("./routes/user.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
<<<<<<< HEAD
const { application } = require("express");
const cors = require("cors");
=======
>>>>>>> 9305b096dd334a4e6e42d595c1e264392df61562

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};
//!Middleware
<<<<<<< HEAD
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.post("*", checkUser);
app.post("/jwtid", requireAuth, (req, res) => {
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});
=======
app.use("/", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use( checkUser);
// app.use("/", requireAuth, (req, res) => {
//   console.log(res.lcals.user);
//   res.status(200).json(res.olocals.user);
// });
>>>>>>> 9305b096dd334a4e6e42d595c1e264392df61562

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
