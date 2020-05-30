// Selector
const [
    countryDisplay, 
    searchBox, 
    input, 
    localCases, 
    localRecovered, 
    localActive, 
    localDeath
] = [
    '.country-name',
    '.search-box',
    '#search',
    '.local-cases',
    '.local-recovered',
    '.active',
    '.local-deaths'
]
.map(selector => document.querySelector(selector))
const ctx = document.getElementById('chart-div').getContext('2d');

let [countryCode, chart, arr] = [geoplugin_countryCode(),,[]];

for (let {name, code} of countryList) {
    if (code == countryCode) {
        fetchData(name); // load location-based data to page
        break
    }
}

// convert string to title case
String.prototype.toTitle = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}


Array('submit', 'change').forEach(ev => {
    searchBox.addEventListener(ev, (e) => {
        e.preventDefault();
        
        countryDisplay.innerText = 'Loading...';
        localCases.innerText =
        localRecovered.innerText =
        localActive.innerText =
        localDeath.innerText =  0 ;

        chart.destroy();
        fetchData(input.value.toTitle());
    })
})


// FUNCTIONS

// Fetch Data With Country Name
function fetchData(country) {
    fetch('https://coronavirus-19-api.herokuapp.com/countries/' + country)
    .then(res => res.json())
    .then(data => {
        countryDisplay.innerHTML = data.country;

        Array(localCases, localRecovered, localActive, localDeath)
        .map((elem, i) => {
            const key = elem.className.split('-').pop()
            elem.innerText = formatNumber(data[key]) || 0
            arr[i] = data[key] || 0
        })

        drawChart()
        input.value = '';
    })
    .catch(({message}) => console.log)
}

// drawing pie chart
function drawChart() {
     chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: 'Total',
                data: arr,
                fill: false,
                backgroundColor: ['grey', 'green', 'blue', 'red'],
            }],
            labels: ['Cases', 'Recovered', 'Active', 'Dead']
        }        
    })
}
