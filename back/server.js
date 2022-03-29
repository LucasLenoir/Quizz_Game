const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const cookieParser = require("cookie-parser");
const categoriesRoutes = require("./routes/categories.routes");
const userRoutes = require("./routes/user.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const { application } = require("express");

//!Middleware
app.use(express.json());
app.use(cookieParser()); app.post("*", checkUser);
app.post("/jwtid", requireAuth, (req, res) => {
  console.log(res.locals.user);
  res.status(200).json(res.locals.user);
});

//!routes
app.use("/api/", categoriesRoutes);
app.use("/api/user", userRoutes);

//!server
app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
