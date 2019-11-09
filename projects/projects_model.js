const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findResource,
  findResourceById,
  insert,
  insertResource,
  findTasks,
  findTaskById,
  insertTask
}

function find() {
  return db('projects')
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

function findResource(projectId) {
  return db('resources')
    .join('project_resources', 'resources.id', 'project_resources.resource_id')
    .where({'project_resources.project_id': projectId})
}

function findResourceById(id) {
  return db('resources')
    .where(({id}))
}

function insertResource(projectId, resource) {
  return db('resources').insert(resource)
    .then(([id]) => {
      return db('project_resources').insert({
        project_id: projectId,
        resource_id: id,
      })
    })
    .catch(() => {
      return findResourceById(id)
    })
}

function findTasks(projectId) {
  return db('tasks')
    .join('projects', 'tasks.project_id', 'projects.id')
    .where({'tasks.project_id': projectId})
    .select('tasks.*', 'projects.name as project_name', 'projects.description as project_description')
}

function findTaskById(id) {
  return db('tasks')
    .where({id})
    .first()
}

function insertTask(projectId, task) {
  return db('tasks').insert({project_id: projectId, ...task})
    .then(([id]) => {
      return findTaskById(id)
    })
}