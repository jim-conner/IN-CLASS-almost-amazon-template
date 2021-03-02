import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// API CALLS FOR BOOKS
const dbUrl = firebaseConfig.databaseURL;

// GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/orderBy="uid"&equalTo="${uid}".json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// FILTER FOR ON SALE BOOKS
const getSaleBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo=true`)
    .then((response) => {
      const saleBooksArray = Object.values(response.data);
      resolve(saleBooksArray);
    }).catch((error) => reject(error));
});

// DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => getBooks().then((booksArray) => resolve(booksArray)))
    .catch((error) => reject(error));
});

// CREATE BOOK
const createBook = (bookObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks(uid).then((booksArray) => resolve(booksArray));
        });
    }).catch((error) => reject(error));
});

// UPDATE BOOK
// SEARCH BOOKS

export {
  getBooks, createBook, deleteBook, getSaleBooks
};
