const showAuthors = (array) => {
// CREATE A BUTTON TO ADD AUTHORS
  document.querySelector('#add-button').innerHTML = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';

  document.querySelector('#store').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';

  // STUDENTS create cards for your authors
  array.forEach((item) => {
    document.querySelector('#store').innerHTML += `<div class="card">
    <div class="card-body" style="height: 180px;">
    <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
    <p class="card-text">${item.email}</p>
    <hr>
    <button class="btn btn-info" data-toggle="modal" data-target="#formModal" id="edit-author-btn--${item.firebaseKey}">Edit Author</button>

    <button class="btn btn-danger" id="delete-author--${item.firebaseKey}">Delete Author</button>
    </div>
  </div>`;

    // document.querySelector('#store').innerHTML += `${item.first_name}`;
  });
};

const emptyAuthors = () => {
  document.querySelector('#store').innerHTML = '<h1 class="text-white">No Authors</h1>';
};

export { showAuthors, emptyAuthors };
