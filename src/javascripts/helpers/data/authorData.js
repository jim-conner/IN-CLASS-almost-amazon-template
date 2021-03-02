import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// import { getBooks } from './bookData';
// API CALLS FOR AUTHORS

const dbUrl = firebaseConfig.databaseURL;

// GET AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/orderBy="uid"&equalTo="${uid}".json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// DELETE AUTHOR
// const deleteAuthor = (firebaseKey) => new Promise (() => {
//   axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
//     .then(() => getAuthors().then((authorsArray) => resolve(booksArray)))
//     .catch((error) => reject(error));
// });

// CREATE AUTHOR
const createAuthor = (authorObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors().then((authorsArray) => resolve(authorsArray));
        });
    }).catch((error) => reject(error));
});
// UPDATE AUTHOR
// SEARCH AUTHORS
export { getAuthors, createAuthor };
