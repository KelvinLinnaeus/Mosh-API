const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
  {id: 1, name: 'Course 1'},
  {id: 2, name: 'Course 2'},
  {id: 3, name: 'Course 3'}
]

app.get('/', (req, res) => {
  res.send("Hello Kelvin!");
})

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send("Course not found")
  res.send(course)
})

app.post('/api/courses', (req, res) => {
  if(!req.body.name || req.body.name.length < 3){
    // Bad request
    res.status(404).send("Name is required with a minimum of 3 characters")
    return
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
  // Use Post Move to Body, Raw, Json
})

app.put('/api/course/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) res.status(404).send(`Course not found`);
  course.name = req.body.name
  res.send(course)
})





const port = process.env.PORT || 3000
app.listen(3000, () => {
  console.log(`listening on ${port}`);
})