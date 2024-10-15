const User = require("../models/User");

const getUserById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  getUserById,
};
