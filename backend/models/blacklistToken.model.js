const mongoose = require('mongoose');
const createModel = require('../utils/createModel'); 

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours
  }
});

const BlacklistToken = createModel('BlacklistToken', blacklistTokenSchema);

module.exports = BlacklistToken;
