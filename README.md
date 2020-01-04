<p align="center">
  <a href="http://dreddit-dredd.herokuapp.com/">
    <img height="200px" src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/frown-solid.svg">
  </a>
</p>

# <h1 align="center">Dreddit</h1>

An online hub for gripes, grumbles, and other grievances. Dreddit is a Reddit clone built with the MERN stack, 
a combination of following four technologies: MongoDB, Express, React, and Node.

[Live Link](http://dreddit-dredd.herokuapp.com/#/)

<p align="center">
  <img src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/readme/homepage.png">
</p>

The Dreddit homepage hits users with a cavalcade of the latest complaints, which can be upvoted, downvoted or commented on. If a user is interested in a post, there are links to quickly jump to the associated SubDreddit and User Profile.

A typical SubDreddit contains all of the posts that were made within it as well a menu to quickly join/leave. Users are given easy access to all of the SubDreddits they have joined in the navbar (the flying saucer button). The Daily Dredd menu is also present here to enoucorage users to continue to explore the site and bask in the bad vibes.

<p align="center">
  <img src="https://github.com/eliraybon/dreddit/blob/master/frontend/public/assets/images/readme/subDreddit.png">
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


## Functionality & MVP

### User Authentication
-  Users can sign up and login
-  Demo login
-  Auth and protected routes 
-  Persistant auth token across refreshes 

### Posts
-  Users can create, read, update, and delete posts

### Comments 
-  Users can comment on posts and other comments
-  Users can edit and delete their own comments

### Upvotes 
-  Users can upvote/downvote posts

### Subdreddit
-  Users can create subdreddits
-  Users can follow/unfollow subdreddits

### Hosting on Heroku

### Production README


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

## Group Members & Work Breakdown
Seth Ullman & Eli Raybon

### Day 1
-  Implement User Auth (Eli & Seth)

### Day 2
-  Posts (Eli)
-  Subdreddits (Seth)

### Day 3
-  Complete features & style (Eli & Seth)

### Day 4
-  Comments (Seth)
-  Upvotes (Eli)

### Day 5
-  Tie up loose ends and deploy to Heroku
