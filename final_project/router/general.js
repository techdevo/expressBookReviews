const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Get all books
  return res.status(200).json({ message: "success", data: books });
});

// Get the book list available in the shop using Promise
public_users.get('/async-get-books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.status(200).json({ message: "success", data: books }));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const index = Object.keys(books).filter((book) => book == isbn)
  return res.status(200).json({ message: `success`, data: books[index] });
});

// Get book details based on ISBN using promise
public_users.get('/async-isbn/:isbn',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        const index = Object.keys(books).filter((book) => book == isbn)
        
        if(index[0] <= Object.keys(books).length) {
            resolve(res.status(200).json({ message: `success`, data: books[index] }));
        } else {
            reject(res.status(200).json({ message: `book not found` }));
        }
      });
      get_books.then(() => console.log("Promise for Task 11 resolved")).catch(() => console.log("Promise for Task 11 rejected"));

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const authorBooks = Object.values(books).filter((book) => book.author == author)
  return res.status(200).json({ message: `success`, data: authorBooks });
});

// Get book details based on author using promise
public_users.get('/async-author/:author',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
    const author = req.params.author;
    const authorBooks = Object.values(books).filter((book) => book.author == author)
    
    if(authorBooks.length) {
        resolve(res.status(200).json({ message: `success`, data: authorBooks }));
    } else {
        reject(res.status(200).json({ message: `book for author not found` }));
    }
    });
    get_books.then(() => console.log("Promise for Task 12 resolved")).catch(() => console.log("Promise for Task 12 rejected"));
   
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  const titleBooks = Object.values(books).filter((book) => book.title == title)
  return res.status(200).json({ message: `success`, data: titleBooks });
});

// Get book details based on title using promise
public_users.get('/async-title/:title', function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        const title = req.params.title;
        console.log('title', title)
        const titleBooks = Object.values(books).filter((book) => book.title == title)
        console.log('titleBooks', titleBooks.length)
        if(titleBooks.length) {
            resolve(res.status(200).json({ message: `success`, data: titleBooks }));
        } else {
            reject(res.status(200).json({ message: `book for titleBooks not found` }));
        }
        });
    get_books.then(() => console.log("Promise for Task 13 resolved")).catch(() => console.log("Promise for Task 13 rejected"));
   
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const index = Object.keys(books).filter((book) => book == isbn)
    if (books[index].reviews.length) {
      return res.status(200).json({ message: `success`, data: books[index].reviews });
    } else {
      res.status(202).json({ message: 'No reviews found for the ISBN provided' });
    }
});

module.exports.general = public_users;
