const addAuthorForm = () => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = `
<form id="submit-author-form" class="mb-4">
      <div class="form-group">
        <label for="title">Author Email</label>
        <input type="email" class="form-control" id="author-email" aria-describedby="bookTitle" placeholder="Enter Author Email" required>
      </div>
      <div class="form-group">
        <label for="first-name">First Name</label>
        <input type="text" class="form-control" id="first-name" placeholder="First Name" required>
      </div>
      <div class="form-group">
        <label for="last-name">Last Name</label>
        <input type="text" class="form-control" id="last-name" placeholder="Last Name" required>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="favorite">
        <label class="form-check-label" for="sale">Favorite Author</label>
      </div>
      <button type="submit" id="submit-author" class="btn btn-primary">Submit Author</button>
    </form>`;
};

export default addAuthorForm;
