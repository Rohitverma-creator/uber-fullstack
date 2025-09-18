
const mapService = require("../services/maps.service");
const {validationResult}=require('express-validator')

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });   
    }
  try {
    const { address } = req.query;
    const coords = await mapService.getAddressCoordinates(address);
    res.json(coords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// controllers/map.controller.js


module.exports.getCoordinates = async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });   
    }
  try {
    const { address } = req.query;
    const coords = await mapService.getCoordinates(address);
    res.json(coords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getDistanceTime = async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });   
    }
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({ error: "Both origin and destination are required" });
    }

    const result = await mapService.getDistanceTime(origin, destination);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports.getAutoCompleteSuggestions = async (req, res) => {
  try {
    const { input } = req.query;

    if (!input) {
      return res.status(400).json({ error: "Input query parameter is required" });
    }

    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

