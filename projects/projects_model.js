const db = require('../data/db-config');

module.exports = {
  findById,
  insert
}

function findById(id) {
  return db('projects')
    .where({id})
    .first()
}


function insert(data) {
  return db('projects').insert(data, 'id')
    .then(([id]) => {
      return findById(id)
    })
}