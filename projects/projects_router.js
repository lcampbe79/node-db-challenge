const express = require('express');

const router = express.Router();

const Projects = require('./projects_model');

router.post('/', (req, res) => {
  Projects.insert(req.body)
  .then(project => {
    project.completed = !!project.completed
    res.status(201).json(project)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({message: 'The project could not be created.'})
  })
})

module.exports = router;