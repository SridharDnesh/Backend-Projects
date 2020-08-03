const mongoose = require("mongoose");

let MONGO_URL;
const MONGO_LOCAL_URL = "mongodb://localhost:27017/LoggerDev";

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("useCreateIndex", true);

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, mongoOptions);
  MONGO_URL = process.env.MONGODB_URI;
} else {
  mongoose.connect(MONGO_LOCAL_URL, mongoOptions);
  MONGO_URL = MONGO_LOCAL_URL;
}

const db = mongoose.connection;

db.on("error", (error) =>
  console.log(`There was an error connecting to the database: ${err}`)
);
db.once("open", () =>
  console.log(
    `You have been successfully connected to the mongo database: ${MONGO_URL}`
  )
);

module.exports = db;
