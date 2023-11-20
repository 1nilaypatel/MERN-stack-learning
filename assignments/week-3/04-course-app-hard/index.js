// /* 
// steps 
// -> npm init -y
// -> make index.js
// -> npm install express
// -> go on expressjs site and bring basic boiler code
// -> npm install jsonwebtoken
// -> npm install mongoose
// */

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

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


// schema is a blueprint for defining the structure of a document within a MongoDB collection. 
const userSchema = new mongoose.Schema({
  // username: {type: String},
  username: String,
  password: String,

// an array denoted by square brackets [], of purchasedCourses that contains references to 'Course' documents. This schema allows for establishing relationships between the 'User' and 'Course' collections in MongoDB. The ref property helps Mongoose understand that the purchasedCourses field should contain references to documents in the 'Course' collection.
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

// Define mongoose models
// After defining schemas, Mongoose models are created using mongoose.model. Models represent collections in MongoDB and provide an interface for interacting with the data.
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://nilaypatel:nPedSbtL8KRxTv%23@cluster0.8a6gpvj.mongodb.net/courses');

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin

  const { username, password } = req.body;
  // findOne: This is a Mongoose method used to find a SINGLE document in the collection that matches the specified conditions.
  // await is used to wait for the completion before moving on to next fine of code, particularly useful when dealing with asynchronous operations, such as database queries, which return promises.
  const admin = await Admin.findOne({username});
  if(admin){
    res.status(403).json({message: "Admin already exists"})
  }else{
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    await newAdmin.save();
    const token = jwt.sign({ username, role: 'admin' }, adminSecretKey, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin

  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, adminSecretKey, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', adminAuthenticateJwt, async (req, res) => {
  // logic to create a course

  const course = new Course(req.body);
  await course.save();
  // course.id represents the ObjectId assigned to the newly created course after it has been saved to the database
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', adminAuthenticateJwt, async (req, res) => {
  // logic to edit a course

  // find and updateing it with req.body in the datatbase of Course
  // { new: true }: This option ensures that the method returns the modified document rather than the original. If not specified or set to false, it would return the original document before the update.
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', adminAuthenticateJwt, async (req, res) => {
  // logic to get all courses

  // find: This is a Mongoose method used to retrieve documents from the collection that match the specified conditions. When no conditions are provided (an empty object {}), it fetches all documents in the collection.
  const courses = await Course.find({});
  res.json({ courses });
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, userSecretKey, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user

  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, userSecretKey, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', userAuthenticateJwt, async (req, res) => {
  // logic to list all courses

  const courses = await Course.find({published: true});
  res.json({ courses });
});

app.post('/users/courses/:courseId', userAuthenticateJwt, async (req, res) => {
  // logic to purchase a course

  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', userAuthenticateJwt, async (req, res) => {
  // logic to view purchased courses

  // populate: is a Mongoose method used to replace specified paths in the document with document(s) from other collection(s). It's a way to "populate" the document with referenced documents from another collection, it's the 'purchasedCourses' field, which likely contains references (ObjectIds) to courses in the "Course" collection.
const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
if (user) {
  res.json({ purchasedCourses: user.purchasedCourses || [] });
} else {
  res.status(403).json({ message: 'User not found' });
}
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});