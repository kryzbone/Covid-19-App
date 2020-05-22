// Selector
const countryDisplay = document.querySelector('.country-name');
const ctx = document.getElementById('chart-div').getContext('2d');
const searchBox = document.querySelector('.search-box');
const input = document.querySelector('#search');
const localCases = document.querySelector('.local-cases');
const localRecovered = document.querySelector('.local-recovered');
const localActive = document.querySelector('.active');
const localDeath = document.querySelector('.local-deaths');

let countryCode = geoplugin_countryCode();
let countryName;
let chart;
let arr = [];

countryLists.forEach(country => {
    if(country.code == countryCode) {
        countryName = country.name;
    }
})


//Load datto to page
fetchData(countryName);



searchBox.addEventListener('submit', (e) => {
    e.preventDefault();
    countryName = input.value.capitalize();

    countryDisplay.innerHTML ='Loading...';
    localCases.innerHTML =  0 ;
    localRecovered.innerHTML =  0;
    localActive.innerHTML = 0;
    localDeath.innerHTML =  0 ;

    arr = [];
    chart.destroy();
    fetchData(countryName);
   
})

searchBox.addEventListener('change', (e) => {
    e.preventDefault();
   
    countryName = input.value.capitalize();

    countryDisplay.innerHTML ='Loading...';
    localCases.innerHTML =  0 ;
    localRecovered.innerHTML =  0;
    localActive.innerHTML = 0;
    localDeath.innerHTML =  0 ;

    
    arr = [];
    chart.destroy();
    fetchData(countryName);
   
})




//FUNCTIONS

//Function for Fetching Data With Country Name
function fetchData(countryName) {
    fetch('https://coronavirus-19-api.herokuapp.com/countries/'+countryName)
    .then(res => res.json())
    .then(data => {
        countryDisplay.innerHTML = data.country;
    
        localCases.innerHTML = formatNumber(data.cases) || 0 ;
        localRecovered.innerHTML = formatNumber(data.recovered) || 0;
        localActive.innerHTML = formatNumber(data.active) || 0;
        localDeath.innerHTML = formatNumber(data.deaths) || 0 ;

        arr[0] = data.cases || 0;
        arr[1] = data.recovered || 0;
        arr[2] = data.active || 0;
        arr[3] = data.deaths || 0;

        drawChart()
        input.value = '';
    })
    .catch(err => {
        console.log(err.message)
    })

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
                backgroundColor: ['grey','green', 'blue', 'red'],
                
            }],
    
            labels: ['Cases', 'Recovered', 'Active', 'Dead']
        },
        options: {
            
        }
        
    });
}



