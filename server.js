const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let projects = [
  { id: 1, name: "Project Alpha", status: "In Progress" },
  { id: 2, name: "Project Beta", status: "Completed" }
];

// Get all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Add a new project
app.post('/projects', (req, res) => {
  const { name, status } = req.body;
  const newProject = { id: projects.length + 1, name, status };
  projects.push(newProject);
  res.json(newProject);
});

// Update a project status
app.put('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const { status } = req.body;
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.status = status;
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// Delete a project
app.delete('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  projects = projects.filter(p => p.id !== projectId);
  res.json({ message: "Project deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
