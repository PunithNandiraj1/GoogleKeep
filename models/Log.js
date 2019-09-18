  
const mongoose = require('mongoose');

const Log = new mongoose.Schema(
  {
    type: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Log', Log);