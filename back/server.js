const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const categoriesRoutes = require("./routes/categories.routes");
const userRoutes = require("./routes/user.routes");
app.use(express.json());
const cors = require('cors')
//routes

app.use(cors())
app.use("/api", categoriesRoutes);
app.use("/api/user", userRoutes);

//server
app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
