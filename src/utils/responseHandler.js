const sendResponse = (res, status, data, message = null) => {
  res.status(status).json({ message, data });
};

module.exports = { sendResponse };
