const authorInfo = (authorObject) => {
  document.querySelector('#add-button').innerHTML += `
  <h1 class="text-white">${authorObject.first_name} ${authorObject.last_name}'s </h1>
  `;
};

export default authorInfo;
