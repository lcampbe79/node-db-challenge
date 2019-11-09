
exports.seed = function(knex) {

  return knex('projects').insert([
    {name: "Name of first seed project", description: "First project seed description.", completed: false},
    {name: "Name of second seed project", description: "Second project seed description.", completed: false},
    {name: "Name of third seed project", description: "Third project seed description.", completed: false},
  ]); 
};
