const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');



//passport setup
const passport = require('passport');
require('./config/passport')(passport);

//import routes 
const users = require('./routes/api/users');
const subDreddits = require('./routes/api/subdreddits');
const posts = require("./routes/api/posts");
const comments = require('./routes/api/comments');
const files = require('./routes/api/file_upload');
//

//import models
const User = require('./models/User');
//

const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}  

// //passport setup  
app.use(passport.initialize());


//app will respond to Postman for testing
app.use(bodyParser.urlencoded({
  extended: true 
}));

//app will respond to json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const user = new User({
    username: 'testUser',
    password: 'password'
  })
  user.save()
  res.send("Hello World");
});

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/files', files);

app.use('/api/subDreddits', subDreddits);

app.listen(port, () => console.log(`Server is running on port ${port}`));
