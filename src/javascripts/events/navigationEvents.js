import signOut from '../helpers/auth/signOut';
import { showBooks } from '../components/books';
import { getBooks, getSaleBooks } from '../helpers/data/bookData';
import { getAuthors } from '../helpers/data/authorData';
import { showAuthors } from '../components/authors';

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    getSaleBooks().then((saleBooksArray) => getSaleBooks(saleBooksArray));
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks().then((booksArray) => showBooks(booksArray));
  });

  // AUTHORS
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors().then((authorsArray) => showAuthors(authorsArray));
  });

  // SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
};

export default navigationEvents;
