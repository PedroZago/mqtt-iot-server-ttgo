const express = require("express");
const iotController = require("../controllers/iotController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, iotController.createData);
router.get("/", authMiddleware, iotController.getData);

module.exports = router;
