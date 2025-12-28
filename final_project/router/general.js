const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;


public_users.post("/register", (req,res) => {
  const password = req.body.password;
  const username = req.body.username;
  if(username && password){
    const existing = users.find((u) => u.username === username)
    if(existing === undefined) {
      users.push({username:username, password:password})
      console.log(users)
      return res.status(300).json({message: `user ${username} added`});
      
    }
    else {
      return res.status(403).json({message: `user ${username} already exists`});
    }
  }
  return res.status(300).json({message: "please supply username and password"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const list = books;
  return res.status(200).json({message:list});
});

const getAllBooks = () => {
  const req = axios.get(`${url}/`)
  req.then(resp => {
    let books = resp.data
    console.log(JSON.stringify(books,null,4));
  })
  .catch(err => {
    console.log(err.toString())
  })
}



// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let b;
  books.forEach(book => {
  console.log(book.isbn)
   if (book.isbn === isbn)
   {
    b = book
   }
  })
  return res.status(200).json({message:b});
 });

  const getBookByIsbn = (isbn) => {
  const req = axios.get(`${url}/isbn/${isbn}`)
  req.then(resp => {
    console.log(resp.data);
  })
  .catch(err => {
    console.log(err.toString())
  })
}

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
 const author = req.params.author;
  let b;
  books.forEach(book => {
  console.log(book.author)
   if (book.author === author)
   {
    b = book
   }
  })
  return res.status(200).json({message:b});
});

const getBooksByAuthor = (a) => {
  const req = axios.get(`${url}/author/${author}`)
  req.then(resp => {
    console.log(resp.data);
  })
  .catch(err => {
    console.log(err.toString())
  })
}



// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let b;
  books.forEach(book => {
  console.log(book.title)
   if (book.title === title)
   {
    b = book
   }
  })
  return res.status(200).json({message:b});
});


const getBookByTitle = (title) => {
  const req = axios.get(`${url}/title/${title}`)
  req.then(resp => {
    console.log(resp.data);
  })
  .catch(err => {
    console.log(err.toString())
  })
}

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let b;
  books.forEach(book => {
  console.log(book.isbn)
   if (book.isbn === isbn)
   {
    b = book
   }
  })
  return res.status(300).json({message:b.reviews});
});

module.exports.general = public_users;
