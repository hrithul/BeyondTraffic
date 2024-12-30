const User = require("../models/Metrics");

const getAllMetrics = async (req, res) => {
  try {
    const metrics = await User.find();
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMetricsById = async (req, res) => {
  try {
    const metrics = await User.findById(req.params.id);
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
