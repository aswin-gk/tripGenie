// constants.js
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define an object to store environment variables
const constants = {
  GDS_KEY: process.env.GDS_KEY,
  GDS_SECRET: process.env.GDS_SECRET,
  // Add more environment variables here if needed
};

// Export the constants object
export default constants;
