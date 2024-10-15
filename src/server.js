require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const iotRoutes = require("./routes/iotRoutes");
const logger = require("./config/logger");
const http = require("http");
const setupSocket = require("./socket/socket");

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

// Connect to database
connectDB();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/iot", iotRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
