const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password
  const user = users.find((u) => u.username === username && u.password === password)
  if(user !== undefined) {
     let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("user successfully logged in")
  }
  else{
    return res.status(404).json({message : "credentials incorrect please try again"})
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const user = req.session.authorization.username;
  const book = books.find((b) => b.isbn === isbn)
  if(book != undefined) {
    const review = {username:user, review: req.body.content}
    const existing = book.reviews.find((r) => r.username === user)
    if(existing === undefined) {
      book.reviews.push(review)
      console.log(book)
      return res.status(300).json({message: `successfully added review on ${isbn}`});
    }
    else {
      book.reviews.splice(book.reviews.findIndex(rev => rev.username === user),1,review)
      console.log(book)
      return res.status(300).json({message: `successfully replaced review on ${isbn}`});
    }
  }
  else{
    return res.status(404).json({message: "book not found, please try again"})
  }
});

// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const user = req.session.authorization.username;
  const book = books.find((b) => b.isbn === isbn)
  if(book != undefined) {
    const existing = book.reviews.find((r) => r.username === user)
    if(existing === undefined) {
      console.log(book)
      return res.status(404).json({message: `Im sorry you have not yet reviewed ${isbn}`});
    }
    else {
      book.reviews.splice(book.reviews.findIndex(rev => rev.username === user),1)
      console.log(book)
      return res.status(300).json({message: `successfully deleted review on ${isbn}`});
    }
  }
  else{
    return res.status(404).json({message: "book not found, please try again"})
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
