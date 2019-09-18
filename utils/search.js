const Fuse = require('fuse');

var options = {
  shouldSort: true,
  keys: [
    '_id',
    'subject',
    'body.blocks.text'
  ]
};

module.exports = function(query, notes) {
  /*
   * TODO: Refactoring later
   */
  const notesList = notes.map(n => { return { ...n, _id: n._id.toString(), body: JSON.parse(n.body) } });
  const fuse = new Fuse(notesList, options);
  return fuse.search(query).map(n => { return { ...n, body: JSON.stringify(n.body) } });
};