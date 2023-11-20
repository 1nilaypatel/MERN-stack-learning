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
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

// Define mongoose schemas
// schema is a blueprint for defining the structure of a document within a MongoDB collection. 
const userSchema = new mongoose.Schema({
  // username: {type: String},
  username: String,
  password: String,

  // The square brackets [] indicate that purchasedCourses is an array.

  // type: mongoose.Schema.Types.ObjectId
// Specifies that each element in the array is expected to be an ObjectId. ObjectId is a special type used in MongoDB for unique identifiers.

// ref: 'Course'
// Indicates that the ObjectId references documents in another collection named 'Course'. This establishes a relationship or reference between the purchasedCourses array and the 'Course' collection.

// an array of purchasedCourses that contains references to 'Course' documents. This schema allows for establishing relationships between the 'User' and 'Course' collections in MongoDB. The ref property helps Mongoose understand that the purchasedCourses field should contain references to documents in the 'Course' collection.
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

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        // return is must to terminate and so to next process
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Connect to MongoDB
// The code connects to a MongoDB database using mongoose.connect. The connection URI specifies the MongoDB server address, credentials, and the name of the database (courses in this case).
// Options such as useNewUrlParser and useUnifiedTopology are provided to ensure compatibility with the latest MongoDB driver.
// Database Name:

// The dbName option in mongoose.connect specifies the name of the database within the MongoDB server that Mongoose will use. In this case, it's set to "courses."
mongoose.connect('mongodb+srv://kirattechnologies:iRbi4XRDdM7JMMkl@cluster0.e95bnsi.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.post('/admin/signup', async (req, res) => {
  const { username, password } = req.body;
  // findOne: This is a Mongoose method used to find a SINGLE document in the collection that matches the specified conditions.
  const admin = await Admin.findOne({username});
  if(admin){
    res.status(403).json({message: "Admin already exists"})
  }else{
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    await newAdmin.save();
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
  }
});

// app.post('/admin/signup', (req, res) => {
//   const { username, password } = req.body;
//   function callback(admin) {
//     if (admin) {
//       res.status(403).json({ message: 'Admin already exists' });
//     } else {
//       const obj = { username: username, password: password };
//       const newAdmin = new Admin(obj);
//       newAdmin.save();
//       const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//       res.json({ message: 'Admin created successfully', token });
//     }

//   }
//   Admin.findOne({ username }).then(callback);
// });

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  // { new: true }: This option ensures that the method returns the modified document rather than the original. If not specified or set to false, it would return the original document before the update.
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  // find: This is a Mongoose method used to retrieve documents from the collection that match the specified conditions. When no conditions are provided (an empty object {}), it fetches all documents in the collection.
  const courses = await Course.find({});
  res.json({ courses });
});

// User routes
app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({published: true});
  res.json({ courses });
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
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

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  // populate: This is a Mongoose method used to replace specified paths in the document with document(s) from other collection(s). It's a way to "populate" the document with referenced documents from another collection.

// 'purchasedCourses': This is the path to the field in the user document that needs to be populated. In this case, it's the 'purchasedCourses' field, which likely contains references (ObjectIds) to courses in the "Course" collection.
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
