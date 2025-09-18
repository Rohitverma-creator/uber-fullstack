const mongoose = require("mongoose");

/**
 * Creates or returns an existing Mongoose model.
 * @param {string} name - Model name
 * @param {mongoose.Schema} schema - Mongoose schema
 * @returns {mongoose.Model}
 */
function createModel(name, schema) {
  return mongoose.models[name] || mongoose.model(name, schema);
}

module.exports = createModel; // ✅ export the function directly
