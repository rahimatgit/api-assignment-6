// getting data from server
function searchButton() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayData(data));
}
// displaying search result
const displayData = data => {

    //number of similar search result
    const div = document.getElementById('similar-search');
    div.textContent = '';
    const h6 = document.createElement('h6');
    const similarSearch = `${data.docs.length}`;
    h6.innerText = `Similar search result found : ${similarSearch}`;
    div.appendChild(h6);

    // show result
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';
    const url = `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`
    data.docs.forEach(element => {
        const secondDiv = document.createElement('div');
        secondDiv.classList.add('card');
        secondDiv.innerHTML = `
    <div class="row g-0 rounded">
        <div class="col-md-4">
        <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class=" rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <h6>Author Name: </h6><p>${element.author_name ? element.author_name[0] : 'unknown'}</p>
            <h6>First Published: </h6><p>${element.first_publish_year ? element.first_publish_year : 'unknown'}</P>
            <h6>Publisher: </h6><p>${element.publisher ? element.publisher : 'unknown'}</p>
            </div>
        </div>
    </div>
    `
        displayResult.appendChild(secondDiv);
    });
}
