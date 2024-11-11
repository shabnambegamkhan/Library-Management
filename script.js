


document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchBooks(query);
    }
});

async function fetchBooks(query) {
    try {
        // Fetch data from API based on the search query
        
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayBooks(data);
    } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Something went wrong while fetching data. Please try again.");
    }
}

function displayBooks(data) {
    const bookResults = document.getElementById('book-results');
    bookResults.innerHTML = '';                                                    // Clear previous results

    if (data.docs && data.docs.length > 0) {
        data.docs.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                <p><strong>First Published:</strong> ${book.first_publish_year || 'Unknown'}</p>
                <p><strong>ISBN:</strong> ${book.isbn ? book.isbn[0] : 'N/A'}</p>
            `;
            bookResults.appendChild(bookItem);
        });
    } else {
        bookResults.innerHTML = '<p>No books found for this search query.</p>';
    }
}
