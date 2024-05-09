import { getHotels } from "../utils/gdsHelper.js";

// Handle POST request
export const handlePostRequest = (req, res) => {
  // Extract data from request body
  const postData = req.body;

  // Process the data (you can perform any logic here)
  console.log("Received POST data:", postData);
  const hotelResults = getHotels(postData.destination);
  console.log(hotelResults);
  // Send response
  res.status(200).json({
    message: "POST request received successfully",
    hotelResults: hotelResults,
  });
};
