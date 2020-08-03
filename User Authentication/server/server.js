const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

require("dotenv").config({ path: "./config/.env" });

/**
 * DATABASE CONNECTION
 */
require("./database");

/**
 * PASSPORT CONFIGURATION
 */
const passport = require("./passport/index");
passport.initialize();

/**
 * MIDDLEWARES
 */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/**
 * ROUTES IMPORT
 */
app.use(require("./routes"));

/**
 * SERVER LISTEN
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
