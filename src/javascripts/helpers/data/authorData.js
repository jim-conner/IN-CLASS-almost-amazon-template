import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// import { getBooks } from './bookData';
// API CALLS FOR AUTHORS

const dbUrl = firebaseConfig.databaseURL;

// GET AUTHORS
// ?orderBy="uid"&equalTo="${uid}"
const getAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json
  
  `)
    .then((response) => {
      if (response.data) {
        const authorArray = Object.values(response.data);
        resolve([authorArray]);
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

// GET FAV AUTHORS here
const getFavoriteAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
    .then((response) => {
      const favAuthorsArray = Object.values(response.data);
      resolve(favAuthorsArray);
    }).catch((error) => reject(error));
});

// DELETE AUTHOR

// CREATE AUTHOR
const createAuthor = (authorObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors(uid).then((authorsArray) => resolve(authorsArray));
        });
    }).catch((error) => reject(error));
});
// UPDATE AUTHOR
// SEARCH AUTHORS
export { getAuthors, createAuthor, getFavoriteAuthors };
