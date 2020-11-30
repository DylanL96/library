const form = document.querySelector('#form');
const tableBody = document.querySelector('#table-body');
const checkboxStatus = document.querySelector('#status')
const toggleButton = document.querySelector('.toggle-button');

//Set up library with book detail and dummy data
let myLibrary = [{
  title: 'Harry Potter',
  author: 'JK Rowling',
  pages: 500,
  status: 'Read'
},
{
  title: 'Random Book Title',
  author: 'Dav Pike',
  pages: 200,
  status: 'Not Read'
}
];


//Constructor function for each new book
function Book(title, author, pages, status){
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status
};

//Renders the table
function render(arrayOfObjects){
  tableBody.innerHTML = '';
  for (let i=0; i<arrayOfObjects.length; i++){
    tableBody.innerHTML +=
    `<tr index="${i}">
    <td>${arrayOfObjects[i].title}</td>
    <td>${arrayOfObjects[i].author}</td>
    <td>${arrayOfObjects[i].pages}</td>
    <td>
        <button class="toggle-button" id="toggle-button" index-button="${i}">${arrayOfObjects[i].status}</button>
    </td>
    <td>
        <a href="#" style="text-decoration:none" class="delete-button">X</a>
    </td>
</tr>`;
  }
};

//DOMContentLoaded event occurs when the initial HTML document has been completely loaded and parsed.
document.addEventListener('DOMContentLoaded', render(myLibrary));


//Function that creates a new book from the constructor function
function addBookToLibrary(){
  event.preventDefault()
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let status = document.getElementById('status').value;

  //Check the status of the book
  if(checkboxStatus.checked){
    status = 'Read';
  } else {
    status = 'Not Read'
  };

  //Instantiates a new Book
  let newBook = new Book(title, author, pages, status);
  
  //Pushes the newBook to the existing myLibrary array
  myLibrary.push(newBook);
  render(myLibrary)
  clearInputs()
  console.log(myLibrary)
};

form.addEventListener('submit', addBookToLibrary);

//Clear inputs after submitting
function clearInputs(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
};

//Function that deletes book
function deleteRow(event){
  const index = event.target.parentElement.parentElement.getAttribute('index');
  const deleteClass = event.target.className

  //Deletes only when the button with the className of delete-button is clicked
  if(deleteClass === 'delete-button'){
    myLibrary.splice(index, 1);
    render(myLibrary)
  }
};

//Function that toggles status
function toggleStatus(event){
  const toggleClass = event.target.className;
  
  //Can only toggle when our cursor is on the toggle-button class
  if(toggleClass === 'toggle-button'){
    if(event.target.innerHTML === 'Read'){
      event.target.innerHTML = 'Not Read'
    } else {
      event.target.innerHTML = 'Read'
    }
  }
};

//Combines the toggleStatus and Delete
function toggleStatusAndDelete(){
  toggleStatus(event)
  deleteRow(event)
};

tableBody.addEventListener('click', toggleStatusAndDelete)
