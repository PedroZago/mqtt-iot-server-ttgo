const IotData = require("../models/IotData");

exports.createData = async (req, res) => {
  try {
    const data = new IotData(req.body);
    await data.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await IotData.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
