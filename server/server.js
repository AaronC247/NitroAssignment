const express = require('express');
const cors = require('cors')
const app = express();

const port = 3000;

// return posts
app.get('/posts', cors(), function(req, res) {
  res.json(posts);
});

// Setting the server to listen at port 3000
app.listen(port, function() {
  console.log("Server is running at port " + port);
});

const posts = [{
  "id": 1,
  "location": "San Francisco",
  "time": "1552657573",
  "author": "Happy User",
  "text": "Proper PDF conversion ensures that every element of your document remains just as you left it."
},{
  "id": 2,
  "location": "San Francisco",
  "time": "1552571173",
  "author": "Happy User",
  "text": "The modern workplace is increasingly digital, and workflows are constantly evolving. "
},{
  "id": 3,
  "location": "San Francisco",
  "time": "1552571174",
  "author": "Happy Developer",
  "text": "Digital transformation isn’t just a buzzword"
},{
  "id": 4,
  "location": "Sydney",
  "time": "1552563973",
  "author": "Happy Developer",
  "text": "An expectation of digital efficiency has become the norm in our daily lives"
},{
  "id": 5,
  "location": "Dublin",
  "time": "1553080742",
  "author": "Happy Manager",
  "text": "A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need."
},{
  "id": 6,
  "location": "Dublin",
  "time": "1553099742",
  "author": "Happy Manager",
  "text": "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time."}
];
