const express = require('express');
let bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


const adminAuthentication = (req, res, next) => {
  const {username, password} = req.headers; // better way to extract 
  const admin = ADMINS.find(a => a.username === username && a.password === password); // need to check both things
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
};

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers; // better way
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    // By doing this, the user object is attached to the req object, making it accessible in subsequent middleware functions or route handlers.
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
};


// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin

  const admin = req.body;
  const existingAdmin = ADMINS.find(t => t.username === admin.username); // with find the 1st object is returned that matches the condition else UNDEFINED
  if (existingAdmin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    ADMINS.push(admin);
    res.json({ message: 'Admin created successfully' });
  }
});

// from here on take care where we need adminAuthentication as a middleware
app.post('/admin/login', adminAuthentication, (req, res) => { 
  // logic to log in admin

  res.json({message: "Logged in successfully"});
});

app.post('/admin/courses', adminAuthentication,  (req, res) => {
  // logic to create a course

  const course = req.body;
  course.id = Date.now(); // use datetimestamp as course ID as it is unique
  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  // logic to edit a course

  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if(course){
  //   Object.assign(target, ...sources) Method:
  // target: The target object to which the properties will be assigned or updated.
  // sources: One or more source objects whose properties will be copied to the target.
    Object.assign(course, req.body); // better way
    res.json({message: 'Course updated successfully'});
  }else{
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
  // logic to get all courses

  res.json({ courses: COURSES });
});


// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user

  const userr = req.body;
  const existingUser = USERS.find(u => u.username === userr.username);
  if (existingUser) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    // Spread Syntax ({...}) is used for object or array literals and allows for the creation of shallow copies.
    const user = {...req.body, purchasedCourses: []}; // better way
    // const user = {
    //   username: req.body.username,
    //   password: req.body.password,
    //   purchasedCourses: []
    // }
    USERS.push(user);
    res.json({ message: 'User created successfully'});
  }
});

app.post('/users/login', userAuthentication, (req, res) => {
  // logic to log in user

  res.json({ message: 'Logged in successfully' });
});

app.get('/users/courses', userAuthentication, (req, res) => {
  // logic to list all courses

  // filter METHOD creates a new array with all elements that pass the test implemented by the provided function.
  res.json({ courses: COURSES.filter(c => c.published) }); // better way
  // let filteredCourses = [];
  // for (let i = 0; i<COURSES.length; i++) {
  //   if (COURSES[i].published) {
  //     filteredCourses.push(COURSES[i]);
  //   }
  // }
  // res.json({ courses: filteredCourses });
});

app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  // logic to purchase a course

  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId && c.published);
  if (course) {
    // find the user in the global user array
    // update the user object
    // remove the old user object to the global USER array.
    // add the new user object to the global USER array.
    req.user.purchasedCourses.push(courseId);
    res.json({ message: 'Course purchased successfully' });
  } else {
    res.status(404).json({ message: 'Course not found or not available' });
  }
});

app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  // logic to view purchased courses

  // filters the COURSES array to retrieve only the courses that have their id included in the purchasedCourses array of the req.user object
  // Arrow Function (c => req.user.purchasedCourses.includes(c.id)): This is the callback function passed to the filter method. It takes an individual course object (c) and returns true or false based on whether the id of the course is included in the purchasedCourses array of the req.user object.
  const purchasedFullCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id)); // better way
  res.json({ purchasedFullCourses });

  // // We need to extract the complete course object from COURSES
  // // which have ids which are present in req.user.purchasedCourses
  // var purchasedCourseIds = req.user.purchasedCourses;
  // var purchasedCourses = [];
  // for (let i = 0; i<COURSES.length; i++) {
  //   if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) { // is just like checking it in set if that element exists
  //     purchasedCourses.push(COURSES[i]);
  //   }
  // } 
  // res.json({ purchasedCourses });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
