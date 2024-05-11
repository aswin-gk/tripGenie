import express from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import {
  handlePostRequest,
  handleCitySearch,
  generateInvoice,
  confirmHotel,
} from "./controllers/dialogflowController.js";
import { fileURLToPath } from "url"; // Import fileURLToPath function

const __filename = fileURLToPath(import.meta.url); // Get current filename
const __dirname = path.dirname(__filename); // Get current directory name

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Configure body-parser middleware
app.use(bodyParser.json());

// Define route for handling POST requests
app.post("/api/webhooks/hotel", handlePostRequest);
app.post("/api/webhooks/citySearch", handleCitySearch);
app.post("/api/webhooks/invoice", generateInvoice);
app.post("/api/webhooks/hotelConfirm", confirmHotel);

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
