let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let messageEl = document.getElementById("message");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(search_results) {
    let searchInput = searchInputEl.value;
    if (search_results.length > 1 && searchInput.includes(search_results)) {
        messageEl.textContent = "";
        searchResultsEl.textContent = "";
        for (let eachItem of search_results) {
            let title = eachItem.title;
            let textEl = document.createElement("p");
            textEl.textContent = title;
            searchResultsEl.appendChild(textEl);
        }
    } else {
        messageEl.textContent = "No results found";
        searchResultsEl.textContent = "";
    }
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search";
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                createAndAppendSearchResults(search_results);
                spinnerEl.classList.toggle("d-none");
            });

    }
});