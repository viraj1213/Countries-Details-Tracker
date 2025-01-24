const countriesContainer=document.querySelector(".countries-container");
const filter=document.querySelector(".filter-by-region");
const searchInput=document.querySelector('.search-container input');
const darkTheme = document.querySelector(".dark-mode");
const darkText = document.querySelector(".dark-text");
const darkIcon = document.querySelector(".dark-mode i");

// Toggle dark mode
darkTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkText.innerText = "Light Mode";
        darkIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        darkText.innerText = "Dark Mode";
        darkIcon.classList.replace("fa-sun", "fa-moon");
    }
});
fetch("https://restcountries.com/v3.1/all").then((res)=>res.json())
.then((data)=>{
    renderCountries(data);
    allCountriesData=data;
})

let allCountriesData;

filter.addEventListener("change",(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
    .then((res)=>res.json())
    .then((data)=>{
        renderCountries(data);
        allCountriesData=data;
    })
});
function renderCountries(data){
        countriesContainer.innerHTML="";
        data.forEach((country)=>{
            const countryCard=document.createElement('a');
            countryCard.href=`file:///D:/C++/Rest%20countries/country.html?name=${country.name.common}`;
            countryCard.classList.add('country-card');
            countryCard.innerHTML=`<img src="${country.flags.svg}" alt="flag"></img>
                                    <div class="card-text">
                                        <h2 class="card-title">${country.name.common}</h2>
                                        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                                        <p><b>Region: </b>${country.region}</p>
                                        <p><b>Capital: </b>${country.capital}</p>
                                    </div>`;
    
            countriesContainer.append(countryCard);
        })
}
searchInput.addEventListener('input',(e)=>{
    const filteredCountries=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
       renderCountries(filteredCountries);
})  
