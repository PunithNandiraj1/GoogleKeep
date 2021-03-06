const  express = require('express');
const Note = require('../../models/Note');
const Log = require('../../models/Log');
const reqFilter = require('../../utils/reqFilter');
const search = require('../../utils/search');

const userAuthenticate = require('../../middleware/userAuthenticate');

const router = express.Router();

router.post('/', userAuthenticate, (req, res) => {
  Note.create({ ...req.body.note, user: req.userAuth._id })
    .then(note => {
      Log.create({ type: 'CREATE', message: `Note ${note._id} created`, user: req.userAuth._id });
      res.json({ note });
    })
    .catch(err => res.status(400).json({ error: err }));
});

router.get('/', userAuthenticate, (req, res) => {
  let filter = {};
  if (req.query.archive) {
    filter.isArchived = req.query.archive === 'true';
  }
  Note.find({ user: req.userAuth._id, ...filter })
    .lean()
    .sort({ createdAt: -1})
    .then(notes => {
      if (req.query.q) {
        const list = search(req.query.q, notes);
        res.json({ notes: list });
      } else {
        res.json({ notes });
      }
    });
});

router.put('/:id', userAuthenticate, (req, res) => {
  const note = reqFilter(req.body.note, ['isPrivate', 'isArchived', 'subject', 'body']);
  Note.findOneAndUpdate({ _id: req.params.id, user: req.userAuth._id }, { $set: {  ...note } }, { new: true })
    .then(note => {
      Log.create({ type: 'UPDATE', message: `Note ${note._id} updated`, user: req.userAuth._id });
      res.json({ note });
    })
    .catch(err => res.status(400).json({ error: err }));
});

router.get('/:id', userAuthenticate, (req, res) => {
  Note.findOne({ _id: req.params.id, user: req.userAuth._id })
    .then(note => res.json({ note }))
    .catch(err => res.status(400).json({ error: err }))
});

router.delete('/:id', userAuthenticate, (req, res) => {
  Note.findOneAndRemove({ _id: req.params.id, user: req.userAuth._id })
    .then(note => {
      Log.create({ type: 'DELETE', message: `Note ${note._id} deleted`, user: req.userAuth._id });
      res.json({ note });
    })
    .catch(err => res.status(400).json({ error: err }))
});

router.get('/:id/public', (req, res) => {
  Note.findOne({ _id: req.params.id, isPrivate: false })
    .populate('user')
    .then(note => res.json({
      note: {
        subject: note.subject,
        body: note.body,
        updatedAt: note.updatedAt,
        nickname: note.user.nickname
      }
    }))
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;