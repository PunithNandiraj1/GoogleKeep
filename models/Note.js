const mongoose = require('mongoose');

const Note = new mongoose.Schema(
  {
    subject: { type: String },
    body: { type: String, required: true },
    isPrivate: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', Note);