const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
const { errorHandler } = require('./utils/errors');
const authRoutes = require("./routes/authRoutes");
const unitRoutes = require("./routes/unitRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const helmet = require('helmet');
app.use(helmet());


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
    },
    ssl: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/ratings", ratingRoutes);

// Error handling middleware
app.use(errorHandler);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Property Management API is running!");
});

// Start the HTTP server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

// Start the HTTPS server if certificates are available
if (process.env.HTTPS_ENABLED === 'true') {
  const https = require('https');
  const fs = require('fs');

  const options = {
    key: fs.readFileSync(process.env.HTTPS_KEY_PATH),
    cert: fs.readFileSync(process.env.HTTPS_CERT_PATH)
  };

  https.createServer(options, app).listen(process.env.HTTPS_PORT || 5001, () => {
    console.log(`HTTPS Server is running on port ${process.env.HTTPS_PORT || 5001}`);
  });
}

// Export for testing
module.exports = app;