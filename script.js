let currentUser = "";

function register() {
  currentUser = username.value;
  fetch("/register", {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name:currentUser})
  });
  loadPosts();
}

function createPost() {
  fetch("/post", {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      user: currentUser,
      text: postText.value,
      image: imgUrl.value
    })
  }).then(loadPosts);
}

function like(id) {
  fetch("/like/"+id, {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({user:currentUser})
  }).then(loadPosts);
}

function comment(id) {
  const c = prompt("Comment:");
  fetch("/comment/"+id,{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({comment:c})
  }).then(loadPosts);
}

function loadPosts() {
  fetch("/posts")
    .then(r=>r.json())
    .then(showPosts);

  fetch("/trending")
    .then(r=>r.json())
    .then(showTrending);
}

function showPosts(list) {
  feed.innerHTML="";
  list.forEach(p=>{
    feed.innerHTML += `
      <div class="post">
        <b>${p.user}</b>
        <p>${p.text}</p>
        ${p.image ? `<img src="${p.image}">` : ""}
        <p>❤️ ${p.likes}</p>
        <button onclick="like(${p.id})">Like</button>
        <button onclick="comment(${p.id})">Comment</button>
        <div>${p.comments.map(c=>"<small>"+c+"</small>").join("<br>")}</div>
      </div>`;
  });
}

function showTrending(list){
  trending.innerHTML="";
  list.forEach(p=>{
    trending.innerHTML += `<div class="post">${p.text} ❤️${p.likes}</div>`;
  });
}

loadPosts();