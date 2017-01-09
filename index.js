cities = [];
window.onload = function () {
    let searchInput = document.querySelector('.search');
    let endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    // just fetch returns the prmise which willl evtl come back
    // we don't know what's coming back
    let prom = fetch(endpoint)
        .then(blob => blob.json())
        .then(data => {
            // spread function from es6
            cities.push(...data);
            //console.table(cities);
        });
    // canvas.addEventListener('mousemove', function (e) { draw(e, isDrawing, ctx); });
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
}

function findMatches(wortToMatch) {
    return cities.filter(place => {
        // match wants reg expression
        const regex = new RegExp(wortToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches(cities) {
    let matchArray = findMatches(this.value);
    let suggestions = document.querySelector('.suggestions');
    let stringArray = matchArray.map(place => {
        let regex = new RegExp(this.value, 'gi');
        let cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
        let stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);
        return `<li><span class="name">${cityName}, ${stateName}, ${place.population}</span></li>`;
    });
    let html = stringArray.reduce((html, el) => {
        return html + el;
    }, "");
    suggestions.innerHTML = html;
}