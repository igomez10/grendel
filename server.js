var AWS = require("aws-sdk");
var express = require('express');
var app = express();
const pool = require('./post.js');
var atob = require('atob');
var btoa = require('btoa');


getPosts = function(){
  return new Promise(function(resolve, reject){
    pool.queryGetPosts()
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      console.log('error getPosts in server.js '  + err)
      reject(err)
    })
  })
};

votePost = function(pId, numVotes){
  return new Promise(function(resolve, reject){
    pool.queryVotePost(pId, numVotes)
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      console.log('error votePost in server.js '  + err)
      reject(err)
    })
  })
};

createPost = function(pContent){
  return new Promise(function(resolve, reject){
    pool.createPost(pContent)
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
}



app.get('/posts', function(req,res){
  console.log("GET /posts  in server.js" );
  getPosts().then((data) => {
    console.log("RESPONDED GET /posts with" + data);
    res.send(data);

  });
})

app.post('/vote/:id/:theVote', function(req, res){
  const numVote = (req.params.theVote=='upvote') ? 1 : -1
  console.log('POST /vote/' + req.params.id + " in server.js");
  votePost(req.params.id, numVote)
  .then((data)=>{
    console.log("RESPONDED POST /vote/" + req.params.id + " with " + data );
    getPosts()
    .then((data)=> {
      console.log('VOTED SUCCESSFULLY')
      res.send(data);
    })
    .catch(err => {
      console.log('ERROR IN VOTING SERVER.JS ' + err)
    })
  })
  .catch(err => {
    console.log("ERROR IN POST VOTE/ID " + err)
    getPosts()
    .then((data)=> {
      console.log('VOTED SUCCESSFULLY')
      res.send(data);
    })
    .catch(err => {
      console.log('ERROR IN VOTING SERVER.JS ' + err)
    })  })
});



app.post('/post/:postContent', function(req, res){
  var postContent = atob(req.params.postContent);
  createPost(postContent)
  .then(data =>{
    console.log('createdPost ' + postContent)
    res.send('SUCCESS')
  })
  .catch((err) => {
    console.log('ERROR POSTING' + err)
    res.send('ERROR')
  })
})


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});







app.listen(4444, function () {
  console.log('Listening on port 4444')
})
