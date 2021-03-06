// import firebase from 'firebase/app';
// import 'firebase/auth';
import addBookForm from '../components/forms/addBookForm';
import editBookForm from '../components/forms/editBookForm';
import { showBooks } from '../components/books';
import { showAuthors } from '../components/authors';
import { authorBookInfo } from '../helpers/data/authorBooksData';
import formModal from '../components/forms/formModal';
import { createAuthor, deleteAuthor } from '../helpers/data/authorData';
import authorInfo from '../components/authorInfo';
import addAuthorForm from '../components/forms/addAuthorForm';
import {
  createBook,
  deleteBook,
  getSingleBook,
  updateBook,
  getAuthorBooks
} from '../helpers/data/bookData';

const domEvents = (uid) => {
  document.querySelector('body').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        const authorId = e.target.id.split('--')[1]; // pull the firebaseKey off the button
        console.warn(authorId);
        deleteBook(authorId).then((booksArray) => showBooks(booksArray));
        getAuthorBooks(authorId).then((authorBooksArray) => console.warn(authorBooksArray));
      }
    }
    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').value,
        author_id: document.querySelector('#author').value,
        uid,
      };
      createBook(bookObject, uid).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR ADDING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const firebaseKey = e.target.id.split('--')[1];
      formModal('Edit Book');
      getSingleBook(firebaseKey).then((bookObject) => editBookForm(bookObject));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').value,
        author_id: document.querySelector('#author').value,
      };
      updateBook(firebaseKey, bookObject).then((booksArray) => showBooks(booksArray));

      $('#formModal').modal('toggle');
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        const authorId = e.target.id.split('--')[1];
        console.warn(authorId);
        deleteAuthor(authorId).then((authorsArray) => showAuthors(authorsArray, uid));
      }
    }

    if (e.target.id.includes('author-name-title')) {
      const authorId = e.target.id.split('--')[1];
      console.warn(authorId);
      // authorBookInfo(authorId).then((authorInfoObject) => console.warn(authorInfoObject)
      authorBookInfo(authorId).then((authorInfoObject) => {
        showBooks(authorInfoObject.books);
        authorInfo(authorInfoObject.author);
      });
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      const authorObject = {
        email: document.querySelector('#author-email').value,
        first_name: document.querySelector('#first-name').value,
        last_name: document.querySelector('#last-name').value,
        favorite: document.querySelector('#favorite').value,
        uid,
      };
      createAuthor(authorObject).then((authorsArray) => showAuthors(authorsArray));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
