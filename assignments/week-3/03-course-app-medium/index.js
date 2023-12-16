// /* 
// steps 
// -> npm init -y
// -> make index.js
// -> npm install express
// -> go on expressjs site and bring basic boiler code 
// -> npm install body-parser
// -> npm install jsonwebtoken
// */

const express = require('express');
const jwt = require('jsonwebtoken');
let bodyParser = require('body-parser')
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

let ADMINS = [];
let USERS = [];
let COURSES = [];


// reading files synchronously one by one using the try-catch block
try{
  ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
  USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'));
}catch{
  ADMINS = [];
  USERS = [];
  COURSES = [];
}

const adminSecretKey = "n1laypat2l";
const adminAuthenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, adminSecretKey, (err, user) => {
      if(err){
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }else{
    res.sendStatus(401);
  }
}

const userSecretKey = "pat2ln1lay";
const userAuthenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, userSecretKey, (err, user) => {
      if(err){
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }else{
    res.sendStatus(401);
  }
}

app.get('/admin/me', adminAuthenticateJwt, (req, res) => {
  res.json({username: req.user.username})
})

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin

  const {username, password} = req.body;
  const admin = ADMINS.find(a => a.username === username);
  if(admin){
    res.status(403).json({ message: 'Admin already exists' });
  }else{
    const newAdmin = {username, password};
    ADMINS.push(newAdmin);
    fs.writeFileSync('admins.json', JSON.stringify(ADMINS)); // writing using node.js file system SYNCHRONOUS model 
    const token = jwt.sign({username, role: 'admin'}, adminSecretKey, {expiresIn: '1h'}); // generating JWT and also specifying roles properties
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin

  const { username, password } = req.headers;
  const admin = ADMINS.find(a => a.username === username && a.password === password);
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, adminSecretKey, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', adminAuthenticateJwt, (req, res) => {
  // logic to create a course

  const course = req.body;
  course.id = COURSES.length + 1;
  COURSES.push(course);
  fs.writeFileSync('courses.json', JSON.stringify(COURSES));
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', adminAuthenticateJwt, (req, res) => {
  // logic to edit a course

  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    Object.assign(course, req.body);
    fs.writeFileSync('courses.json', JSON.stringify(COURSES));
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', adminAuthenticateJwt, (req, res) => {
  // logic to get all courses

  res.json({ courses: COURSES });
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user

  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    const token = jwt.sign({ username, role: 'user' }, userSecretKey, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user

  const {username, password} = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, userSecretKey, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', userAuthenticateJwt, (req, res) => {
  // logic to list all courses

  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', userAuthenticateJwt, (req, res) => {
  // logic to purchase a course

  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync('users.json', JSON.stringify(USERS));
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', userAuthenticateJwt, (req, res) => {
  // logic to view purchased courses

  const user = USERS.find(u => u.username === req.user.username);
  if(user){
    res.json({purchasedCourses: user.purchasedCourses || []});
  }else{
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
