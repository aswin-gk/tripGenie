import { getHotels, getCity } from "../utils/gdsHelper.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { totalmem } from "os";
import { fileURLToPath } from "url"; // Import fileURLToPath function
import { request } from "http";

const __filename = fileURLToPath(import.meta.url);

function generateUniqueID() {
  return crypto.randomBytes(16).toString("hex");
}
// Handle POST request
export const handlePostRequest = async (req, res) => {
  // Extract data from request body
  const postData = req.body;

  // Process the data (you can perform any logic here)
  console.log("Received POST data:", postData);
  const hotelResults = await getHotels(postData.destination);
  console.log(hotelResults);
  const names = hotelResults.map((hotel) => hotel.name);
  // Send response
  res.status(200).json({
    message: "POST request received successfully",
    hotelResults: hotelResults,
  });
};

export const handleCitySearch = async (req, res) => {
  // Extract data from request body
  const postData = req.body;

  // Process the data (you can perform any logic here)
  console.log("Received POST data:", postData);
  const result = await getCity(postData.destination);
  if (result?.size == 0) {
    res.status(404);
  }
  // Send response
  res.status(200).json({
    iataCode: result[0]?.iataCode,
    cityName: result[0]?.name,
  });
};

export const confirmHotel = async (req, res) => {
  // Extract data from request body
  const postData = req.body;

  // Process the data (you can perform any logic here)
  console.log("Received Confirm hotel POST data:", postData);

  // Send response
  res.status(200).json({
    hotelName: postData.hotel,
    price: 300,
  });
};

export const generateInvoice = async (req, res) => {
  // Extract data from request body
  const postData = req.body;

  // Process the data (you can perform any logic here)
  console.log("Received POST data:", postData);

  try {
    const __dirname = path.dirname("../");
    const invoiceID = generateUniqueID();
    const htmlContent = generateInvoiceHTML(postData.items, postData.user);
    const invoicePath = path.join(
      __dirname,
      "public",
      "invoice",
      `${invoiceID}.html`
    );
    const directory = "./public/invoice/";
    const filePath = path.join(directory, `${invoiceID}.html`);
    // Create directory if it doesn't exist
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
      }

      // Write file
      fs.writeFile(filePath, htmlContent, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          // Handle error response if this code is part of an HTTP request handler
          return res.status(500);
        }
        console.log("File written successfully:", filePath);
        // Optionally, send success response
        const invoiceURL = `/invoice/${invoiceID}.html`;
        res.status(200).json({
          paymentLink: "https://hackit.aswingk.com" + invoiceURL,
        });
      });
    });
  } catch (error) {
    console.error(error);
    // Send response
    res.status(500);
  }
};

function generateInvoiceHTML(items, user) {
  let totalAmount = 0;
  let tableRows = "";
  for (let i = 0; i < items.length; i++) {
    tableRows += `<tr>
      <td>${items[i].description}</td>
      <td>$${items[i].amount}</td>
    </tr>`;
    totalAmount += items[i].amount;
  }

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Invoice</title>
  <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .invoice {
            width: 80%;
            margin: 20px auto;
            border: 1px solid #ccc;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .invoice-details {
            margin-bottom: 20px;
        }

        .invoice-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .invoice-details th,
        .invoice-details td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }

        .invoice-footer {
            margin-top: 20px;
            text-align: right;
        }

        .btn-make-payment {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>

<body>
  <div class="invoice">
    <div class="invoice-header">
      <h2>Payment Invoice</h2>
    </div>
    <div class="invoice-details">
      <table>
        <tr>
          <th>Invoice Number:</th>
          <td>#INV-${crypto.randomBytes(8).toString("hex")}</td>
        </tr>
        <tr>
          <th>Date:</th>
          <td>${new Date().toDateString()}</td>
        </tr>
        <tr>
          <th>Due Date:</th>
          <td>${new Date().toDateString()}</td>  </tr>
        <tr>
          <th>Client:</th>
          <td>${user.name.name},${user.email}</td>  </tr>
      </table>
    </div>
    <div class="invoice-items">
      <table>
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        ${tableRows}
      </table>
    </div>
    <div class="invoice-footer">
      <p>Total Amount Due: $${totalAmount}</p>
      <button class="btn-make-payment" onclick="makePayment()">Make Payment</button>
    </div>
  </div>

  <script>
    function makePayment() {
      // Your payment processing logic goes here
      alert("Redirecting to payment gateway...");
      // You can redirect the user to a payment gateway or perform any other action as needed
    }
  </script>
</body>

</html>`;
}
