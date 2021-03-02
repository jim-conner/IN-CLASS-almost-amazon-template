import firebase from 'firebase/app';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import { showBooks } from '../components/books';
import { createAuthor } from '../helpers/data/authorData';
import {
  createBook,
  deleteBook
} from '../helpers/data/bookData';

const domEvents = (uid) => {
  document.querySelector('body').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        // pull the firebaseKey off the button
        const firebaseKey = e.target.id.split('--')[1];
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }
    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      console.warn(firebase.auth().currentUser.uid);
      // const userId = firebase.auth().currentUser.uid;
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').value,
        author_id: document.querySelector('#author').value,
        uid,
        // I can add only uid here now?
      };
      createBook(bookObject, uid).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR ADDING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('CLICKED EDIT BOOK', e.target.id);
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      console.warn('CLICKED EDIT BOOK', e.target.id);
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      const authorObject = {
        email: document.querySelector('#author-email').value,
        firebaseKey: '',
        first_name: document.querySelector('#first-name').value,
        last_name: document.querySelector('#last-name').value,
        uid
      };
      createAuthor(authorObject).then((authorsArray) => showBooks(authorsArray));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
