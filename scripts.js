const bookView = document.querySelector('.book-view');
const addBtn = document.querySelector(".add-book");
const submitBtn = document.querySelector('.submit-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const bookForm = document.querySelector('.form-container');
const readBookTab = document.querySelector('.books-completed');
const mainPageBtn = document.querySelector('.home-page');
let readBookDiv = document.querySelector('.completed');

const myLibrary = [];
const readBooksList = [];
const mainPageList = [];

document.addEventListener("DOMContentLoaded", () => {
    mainPageBtn.disabled = true;
});

function createCard(book) {
    let card = document.createElement("div");
    let bookTitle = document.createElement("div");
    let bookAuthor = document.createElement("div");
    let bookPages = document.createElement("div");
    let cardBtns = document.createElement("div");
    let removeBook = document.createElement("button");
    let readBook = document.createElement("button");

    card.classList.add("card");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-title");
    cardBtns.classList.add("card-buttons");
    removeBook.classList.add("remove-book");
    readBook.classList.add("read-book");

    bookTitle.textContent = 'Name: ' + book.bookName;
    bookAuthor.textContent = 'Author: ' + book.bookAuthor;
    bookPages.textContent = 'Pages : ' + book.bookPages;
    removeBook.textContent = "Remove";
    readBook.textContent = "Read?";

    removeBook.addEventListener("click", () => {
        let child = removeBook.parentNode.parentNode;
        let parent = child.parentElement;
        parent.removeChild(child);

        let bookName = child.children[0].textContent;
        for (let i in mainPageList) {
            if (mainPageList[i].children[0].textContent == bookName) {
                mainPageList.splice(i, 1);
                break;
            }
        }

        for (let i in readBooksList) {
            if (readBooksList[i].children[0].textContent == bookName) {
                readBooksList.splice(i, 1);
                break;
            }
        }
    });

    readBook.addEventListener("click", () => {
        book.didRead = true;
        let parentDiv = readBook.parentNode.parentNode;

        if (readBook.textContent == "Read?") {
            readBook.textContent = "Not Read?";
            parentDiv.style.opacity = "0.5";
            readBooksList.push(parentDiv);
            console.log(readBooksList);
        }
        else {
            readBook.textContent = "Read?";
            parentDiv.style.opacity = "1";
            let bookName = parentDiv.children[0].textContent;
            for (let i in readBooksList) {
                if (readBooksList[i].children[0].textContent == bookName) {
                    readBooksList.splice(i, 1);
                    break;
                }
            }
        }
    });

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    cardBtns.appendChild(removeBook);
    cardBtns.appendChild(readBook);
    card.appendChild(cardBtns);

    bookView.appendChild(card);
    mainPageList.push(card);
}

function Book(bookName, bookAuthor, bookPages) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookPages = bookPages;
    this.didRead = false;
}

function addBookToLibrary(event) {
    event.preventDefault();
    let bookName = document.getElementById("book-name").value;
    let bookAuthor = document.getElementById("book-author").value;
    let bookPages = document.getElementById("book-pages").value;

    let myBook = new Book(bookName, bookAuthor, bookPages);
    myLibrary.push(myBook);
    createCard(myBook);
    document.getElementById("form-popup").style.display = "none";
    bookForm.reset();
}

addBtn.addEventListener("click", () => {
    document.getElementById("form-popup").style.display = "block";
});

readBookTab.addEventListener("click", () => {
    while (readBookDiv.firstChild) {
        readBookDiv.removeChild(readBookDiv.lastChild);
    }
    for (let i in readBooksList) {
        readBookDiv.appendChild(readBooksList[i]);
    }
    bookView.style.display = "none";
    readBookDiv.style.display = "grid";
    mainPageBtn.disabled = false;
});

mainPageBtn.addEventListener("click", () => {
    while (bookView.firstChild) {
        bookView.removeChild(bookView.lastChild);
    }
    for (let i in mainPageList) {
        bookView.appendChild(mainPageList[i]);
    }
    readBookDiv.style.display = "none";
    bookView.style.display = "grid";
    mainPageBtn.disabled = true;
});

cancelBtn.addEventListener("click", () => {
    document.getElementById("form-popup").style.display = "none";
    bookForm.reset();
});