const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let users = [];
let posts = [];
let notifications = [];

/* USER REGISTER */
app.post("/register", (req, res) => {
  const user = { id: Date.now(), name: req.body.name, following: [] };
  users.push(user);
  res.json(user);
});

/* CREATE POST */
app.post("/post", (req, res) => {
  const post = {
    id: Date.now(),
    user: req.body.user,
    text: req.body.text,
    image: req.body.image,
    tags: extractTags(req.body.text),
    likes: 0,
    comments: []
  };
  posts.unshift(post);
  res.json(post);
});

/* GET POSTS */
app.get("/posts", (req, res) => {
  res.json(posts);
});

/* LIKE */
app.post("/like/:id", (req, res) => {
  const p = posts.find(x => x.id == req.params.id);
  if (p) {
    p.likes++;
    notifications.push(`${req.body.user} liked your post`);
  }
  res.json(p);
});

/* COMMENT */
app.post("/comment/:id", (req, res) => {
  const p = posts.find(x => x.id == req.params.id);
  if (p) {
    p.comments.push(req.body.comment);
  }
  res.json(p);
});

/* TRENDING */
app.get("/trending", (req, res) => {
  const sorted = [...posts].sort((a,b)=>b.likes-a.likes);
  res.json(sorted.slice(0,5));
});

function extractTags(text) {
  return text.match(/#\w+/g) || [];
}

app.listen(3000, () => console.log("Running on 3000"));