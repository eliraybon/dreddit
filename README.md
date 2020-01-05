<p align="center">
  <a href="http://dreddit-dredd.herokuapp.com/">
    <img height="200px" src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/frown-solid.svg">
  </a>
</p>

# <h1 align="center">Dreddit</h1>

[Live Link](http://dreddit-dredd.herokuapp.com/#/)

An online hub for gripes, grumbles, and other grievances. Dreddit is a Reddit clone built with the MERN stack, 
a combination of following four technologies: MongoDB, Express, React, and Node.

Created by Seth Ullman and Eli Raybon.

## Features
-  Create and delete posts
-  Photo and video uploads (using Multer and Amazon AWS)
-  Comment on posts or reply to other comments
-  Upvote/downvote posts and comments 
-  Creating your own SubDreddit 
-  Search Bar
-  User Authentication

<p align="center">
  <img src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/readme/homepage.png">
</p>

The Dreddit homepage hits users with a cavalcade of the latest complaints, which can be upvoted, downvoted or commented on. If a user is interested in a post, there are links to quickly jump to the associated SubDreddit or User Profile.

A typical SubDreddit contains all of the posts that were made within it as well a menu to quickly join/leave. Users are given easy access to all of the SubDreddits they have joined in the navbar (the flying saucer button). The Daily Dredd menu is also present here to enoucorage users to continue to explore the site and bask in the bad vibes.

<p align="center">
  <img src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/readme/subDreddit.png">
</p>

Users can create posts within a SubDreddit and upload their own photos and videos.

<p align="center">
  <img src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/readme/uploads.png">
</p>

The Search Bar lets users search the site for specific SubDreddits and other subjects they may wish to gripe about. This is accomplished using regular expressions to match the user's query and return the closest results. 

<p align="center">
  <img src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/readme/searchbar.png">
</p>

Here's a look at what the search route looks like:

```js
router.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  if (!searchTerm) return res.send([]);

  Subdreddit.find({ title: { $regex: searchTerm, $options: "i" } })
    .then(subs => {
      return res.send(subs);
    })
})
```

Another cool feature of Dreddit is the nested comment system. All comments can be upvoted, downvoted and replied to.

<p align="center">
  <img src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/readme/nestedcomments.png">
</p>


## Technololgies
-  React
-  Redux
-  Node
-  Express
-  MongoDB
-  Axios
-  BCrypt
-  HTML
-  CSS
-  Multer
-  AWS S3
