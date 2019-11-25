const express = require("express");
const mongoose = require('mongoose');

const users = require('./routes/api/users');

const User = require('./models/User');

const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  // debugger;   
  const user = new User({
    username: 'testUser',
    password: 'password'
  })
  user.save()
  res.send("Hello World");
});

app.use('/api/users', users);

app.listen(port, () => console.log(`Server is running on port ${port}`));
