const express = require('express');
const  Log = require('../../models/Log');
const userAuthenticate = require('../../middleware/userAuthenticate');

const router = express.Router();

router.get('/', userAuthenticate, (req, res) => {
  Log.find({ user: req.userAuth._id })
    .sort({ createdAt: -1 })
    .then(logs => res.json({ logs }));
});

module.exports = router;
