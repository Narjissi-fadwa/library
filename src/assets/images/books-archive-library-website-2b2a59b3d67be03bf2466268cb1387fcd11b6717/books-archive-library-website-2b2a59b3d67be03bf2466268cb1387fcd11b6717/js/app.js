const totalBooks = document.getElementById('total-books');
const booksContainer = document.getElementById('display-books');

// handle fetch books data from url 
const loadBooksData = () => {
    const searchField = document.getElementById('search-input');
    const searchValue = searchField.value;
    searchField.value = '';
    totalBooks.textContent = '';

    // loading spinner added before fetch the data
    booksContainer.textContent = '';
    totalBooks.textContent = '';
    totalBooks.innerHTML = `
    <div class="text-center mx-auto my-5">
        <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;

    // check the input value is empty or not
    if (searchValue === '') {
        booksContainer.textContent = '';
        totalBooks.textContent = '';
        totalBooks.innerHTML = `
        <div class="alert-position alert alert-warning alert-dismissible fade show w-75 mx-auto  mt-5" role="alert">
            <h3 class="text-danger">Please Enter a Value First!</h3>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
            `;

    }
    else {
        fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
            .then(res => res.json())
            .then(data => displayBooks(data));
    }

}


// display books data
const displayBooks = booksData => {
    const { docs, numFound } = booksData;
    const foundData = numFound;
    //check if books found or not
    if (foundData === 0) {
        booksContainer.textContent = '';
        totalBooks.textContent = '';
        totalBooks.innerHTML = `
        <div class="alert-position alert alert-warning alert-dismissible fade show w-75 mx-auto  mt-5" role="alert">
            <h3 class="text-danger">NO RESULT FOUND!</h3>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
            `;

    }
    else {
        // total books display data
        totalBooks.textContent = '';
        totalBooks.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h5 class="text-center">Found total ${numFound} books.</h5>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;

        const requiredBooks = docs.slice(0, 30);

        // set each book information
        booksContainer.textContent = '';
        requiredBooks.forEach(book => {
            const booksDiv = document.createElement('div');
            booksDiv.classList.add('col');
            booksDiv.innerHTML = `
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-75 p-3" alt="Book Cover Image">
        <div class="card-body">
            <h5 class="card-title fw-bold">Book Name: ${book?.title ?? ''}</h5>
            <p><span class="fw-bold">Author Name:</span> ${book?.author_name ?? ''}</p>
             <P><span class="fw-bold">Publishers:</span> ${book?.publisher ?? ''}</P>
            <p><span class="fw-bold">First Published:</span> ${book?.first_publish_year ?? ''}</p>
            </div>
        </div>
        `;
            booksContainer.appendChild(booksDiv);

        });
    }

}
