const LIBRARY = [];

// Constructor for books
function Book(title, author, pageCount, id, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.id = id;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pageCount, isRead) {
  let uuid = crypto.randomUUID();
  LIBRARY.push(new Book(title, author, pageCount, uuid, isRead));
}

function displayLibrary() {
  console.log('Library:');
  for (book of LIBRARY) {
    console.log(book);
  }
}

// TEST CODE
// let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// console.log(theHobbit);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('The Night Circus', 'Erin Morgenstern', 400, false);
addBookToLibrary('The Tenant (B&N Exclusive Edition)', 'Freida McFadden', 368, false);
addBookToLibrary("Empire of AI: Dreams and Nightmares in Sam Altman's OpenAI", 'Karen Hao', 496, false);
addBookToLibrary('Never Flinch: A Novel', 'Stephen King', 448, false);
// console.log('library: ', LIBRARY);
displayLibrary();


const addBookBtn = document.querySelector('.add-book-btn');
const modal = document.querySelector('.modal');
const submitBookBtn = document.querySelector('.submit-book-btn');
addBookBtn.addEventListener('click', (e) => {
  modal.showModal();
});

submitBookBtn.addEventListener('click', (e) => {
  e.preventDefault();

  // insert code here

  modal.close();
})
