// LIBRARY CODE
const LIBRARY = [];

function removeFromLibrary(id) {
  let index = LIBRARY.findIndex(book => book.id === id);
  // LIBRARY.splice(index, 1)
  // console.log(LIBRARY);
  console.log(index);
  
}

// BOOK CODE
function Book(title, author, pageCount, id, hasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.id = id;
  this.hasRead = hasRead;
}

Book.prototype.toggleHasRead = function() {
  this.hasRead = !this.hasRead;
}

function addBookToLibrary(title, author, pageCount, hasRead) {
  let uuid = crypto.randomUUID();
  LIBRARY.push(new Book(title, author, pageCount, uuid, hasRead));
}

// DOM MANIPULATION
const addBookBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('#modal-form');
const modalSubmitBtn = document.querySelector('#modal-submit-btn');
const modalCancelBtn = document.querySelector('#modal-cancel-btn');
const bookGrid = document.querySelector('#book-card-grid');
addBookBtn.addEventListener('click', (e) => {
  modal.showModal();
});

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submit button pressed');
  // insert code here
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pageCount = document.querySelector('#page-count').value;
  let hasRead = document.querySelector('#read').checked;
  // console.log(title, author, pageCount, hasRead);
  addBookToLibrary(title, author, pageCount, hasRead);
  console.log(LIBRARY);
  document.querySelector('#modal-form').reset();
  displayLibrary();
  modal.close();
});

modalCancelBtn.addEventListener('click', (e) => {
  modal.close()
});

function displayLibrary() {
  console.log('Library:');
  bookGrid.innerHTML = "";
  for (book of LIBRARY) {
    let readStatus;
    // if (book.hasRead) readStatus = 'yes';
    // else readStatus = 'no';
    if (book.hasRead) readStatus = 'read';
    else readStatus = 'not-read';
    const bookCard = document.createElement('div');
    bookCard.setAttribute('data-id', book.id)
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
        <h3 class="title">${book.title}</h3>
        <h4 class="author">${book.author}</h4>
        <div class="book-details">
          <p>${book.pageCount} pages</p>
          <!--<p>Read yet? <span class="${readStatus}">${readStatus.charAt(0).toUpperCase() + readStatus.slice(1)}</span></p> -->
        </div>
        <div class="book-actions">
        <button id="${book.id}" class="${readStatus}">Not Read</button>
          <button id="delete__${book.id}">Remove</button>
        </div>
    `;
    
    bookGrid.appendChild(bookCard);
  }
}

bookGrid.addEventListener('click', (e) => {
  const targetBtn = document.getElementById(`${e.target.id}`);
  console.log(targetBtn);
  if (targetBtn !== null) {
    if (targetBtn.id.includes('delete__')) {
      removeBook(takeIndex(e.target));
    }
    else {
      LIBRARY[takeIndex(e.target)].toggleHasRead();
      console.log(LIBRARY);
      statusColor(LIBRARY[takeIndex(e.target)], targetBtn);
    }
  }
  
});

function removeBook(index) {
  console.log(index);
  LIBRARY.splice(index, 1);
  displayLibrary();
}

function takeIndex(item) {
  return LIBRARY.findIndex((e) => {
    if (item.id.includes('delete__')) {
      item.id = item.id.replace("delete__", "");
      return item.id === e.id
    }
    else return item.id === e.id;
  });
}

function statusColor(item, button) {
  button.className = '';
  if (item.hasRead) {
    button.classList.add('read');
    button.innerText = 'Read'
  } 
  else {
    button.classList.add('not-read');
    button.innerText = 'Not Read'
  }
}

// TINITIALIZATION
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('The Night Circus', 'Erin Morgenstern', 400, false);
addBookToLibrary('The Tenant (B&N Exclusive Edition)', 'Freida McFadden', 368, false);
addBookToLibrary("Empire of AI: Dreams and Nightmares in Sam Altman's OpenAI", 'Karen Hao', 496, false);
addBookToLibrary('Never Flinch: A Novel', 'Stephen King', 448, false);
console.log('library: ', LIBRARY);
displayLibrary();
