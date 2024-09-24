const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    let dbCon = process.env.MONGO_URI || "__MONGO_URI__";
    let dbName = process.env.DB_NAME || "__DB_NAME__";
    console.log("Connecting to database, Database Name: " + dbName);
    console.log("Connection String: " + dbCon);

    const conn = await mongoose.connect(dbCon, {
      dbName: dbName,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    return {
      success: true,
      message: `MongoDB Connected: ${conn.connection.host}`,
    };
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);

    return {
      success: false,
      message: `Failed to connect to MongoDB: ${error.message}`,
    };
  }
};

module.exports = connectDB;
