const express = require('express');

const router = express.Router();

const Projects = require('./projects_model');

router.get('/', (req, res) => {
  Projects.find()
  .then(projects => {
    projects = projects.map((project) => {
      return {
        ...project,
        completed: !!project.completed
      }
    });
    res.status(200).json(projects)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({message: 'The projects could not be retrieved.'})
  })
})

router.get('/:id/resources', (req, res) => { 
  Projects.findResource(req.params.id)
  .then(resources => {
    res.status(200).json(resources)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({message: 'The resources could not be retrieved.'})
  })
})

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

router.post('/:id/resources', (req, res) => {
  Projects.insertResource(req.params.id, req.body)
    .then(resource => {
      res.status(201).json(resource)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({message: 'The resource could not be created.'})
    })
})

router.post('/:id/tasks', (req, res) => {
  Projects.insertTask(req.params.id, req.body)
    .then(task => {
      task.completed = !!task.completed;
      res.status(201).json(task)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({message: "The task could not be created"})
    })
})

router.get('/:id/tasks', (req, res) => {
  Projects.findTasks(req.params.id)
  .then(tasks => {
    tasks = tasks.map((task) => {
      return {
        ...task,
        completed: !!task.completed,
      }
    });
    res.status(200).json(tasks)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      message: "The tasks could not be retrieved."
    })
  })
})

module.exports = router;