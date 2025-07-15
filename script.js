let searchInput = document.getElementById('searchInput')
let searchResults = document.getElementById("searchResults")
let spinner = document.getElementById("spinner")

function addElements(element) {
    spinner.classList.add("d-none")
    let {
        title,
        link,
        description
    } = element
    console.log(title, link, description)

    let newEl = document.createElement("div")
    newEl.classList.add("result-item")

    let titleEl = document.createElement("a")
    titleEl.classList.add("result-title")
    titleEl.href = link
    titleEl.target = "_blank"
    titleEl.textContent = title
    newEl.appendChild(titleEl)

    let breakEl = document.createElement("br")
    newEl.appendChild(breakEl)

    let urlEl = document.createElement("a")
    urlEl.classList.add("result-url")
    urlEl.href = link
    urlEl.target = "_blank"
    urlEl.textContent = link
    newEl.appendChild(urlEl)

    let newBreak = document.createElement("br")
    newEl.appendChild(newBreak)

    let descriptionEl = document.createElement("a")
    descriptionEl.classList.add("link-description")
    descriptionEl.href = link
    descriptionEl.target = "_blank"
    descriptionEl.textContent = description
    newEl.appendChild(descriptionEl)

    searchResults.appendChild(newEl)
}

function displayItems(searchResults) {
    for (let element of searchResults) {
        addElements(element)
    }
}

function getResults(event) {
    if (event.key === "Enter") {
        searchResults.textContent = ""
        spinner.classList.remove("d-none")

        let value = searchInput.value
        let url = "https://apis.ccbp.in/wiki-search?search=" + value
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData
                displayItems(search_results)
            })
    }
}

searchInput.addEventListener("keydown", getResults)