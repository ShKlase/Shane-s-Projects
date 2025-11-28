let darkModeSwitch = document.querySelector('.theme-container');
let body = document.body;
let DarkMode = false;
let whereHeader = document.querySelector(`.where-theme-header-container`)
let backBtn = document.querySelector(".back-btn");
let expandedPage = document.querySelector(".expanded-info");
let homePage = document.querySelector(".home-page");
let country = document.querySelectorAll(".country");
let darkModeHeader = document.querySelector(".dark-mode-header");
let where = document.querySelector(".where-header");
let searchContainer = document.querySelectorAll('.input-search-container, .country-input, .dropdown-toggle, .dropdown-menu, .dropdown-menu *, .fa-magnifying-glass, .fa-caret-down')
let borderCountries = document.querySelectorAll(".border-country-buttons")
let countryContainer = document.querySelector(".countries-container");
let dropDownItems = document.querySelectorAll(".dropdown-item");
let countrySearch = document.querySelector(".country-input");
let clearButton = document.querySelector(".fa-x");
let clickableInfo = document.querySelector(".clickable-info-container")

attachDropdownListener(); // initialize dropdown behavior

darkModeSwitch.addEventListener('click', () => {

    if (!DarkMode) {
      // ---- ACTIVATE DARK MODE ----
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        body.style.backgroundColor = '';
        body.style.color = '';
        whereHeader.style.color = 'white';
        whereHeader.style.background = `hsl(209, 23%, 22%)`;
        darkModeHeader.style.color = 'white';
        where.style.color = 'white';
        whereHeader.style.borderBottom = `none`
        clearButton.style.color = `white`


        country.forEach(card => {   
        card.style.background = `hsl(209, 23%, 22%)`

        })
        
        // Change search input and icon colors
        searchContainer.forEach(thing => {
            thing.style.background = `hsl(209, 23%, 22%)`
            thing.style.color = `white`
            thing.classList.add('placeholder-dark');
           

            if(thing.tagName === `I`){
                thing.style.color =`white`;
                thing.style.background = 'none';
            }
        })
        // Update button styles
        backBtn.style.background = `hsl(209, 23%, 22%)`;
        backBtn.style.color = `white`;

        borderCountries.forEach(border => {
            border.style.background = `hsl(209, 23%, 22%)`;
            border.style.color = `white`
        })


        DarkMode = true;
        updateCountryCardBackgrounds(DarkMode)
        
    } else {
      // ---- DEACTIVATE DARK MODE ----
        body.classList.remove('dark-mode');
        body.classList.add('light-mode')
        body.style.backgroundColor = 'hsl(0, 0%, 98%)';
        body.style.color = 'black';
        whereHeader.style.color = '';
        whereHeader.style.background = '';
        darkModeHeader.style.color = 'black';
        where.style.color = 'black';
        whereHeader.style.borderBottom = `2px solid #E0E0E0;`
        clearButton.style.color = `grey`

        // Update card and border colors
        country.forEach(card => {   
        card.style.background = `white`
        })

         searchContainer.forEach(thing => {
            thing.style.background = `white`
            thing.style.color = `black`
            thing.style.textColor = `white`
            thing.classList.remove('placeholder-dark');
          
        })

        backBtn.style.background = `white`;
        backBtn.style.color = `black`;

        borderCountries.forEach(border => {
            border.style.background = `white`;
            border.style.color = `black`
        })
        

        DarkMode = false;
        updateCountryCardBackgrounds(DarkMode)
    }
});

// ==============================
// FETCH AND RENDER COUNTRY DATA
// ==============================

fetch('data.json')
  .then(response => response.json()) 
  .then(data => {
    appendCountries(data); // dynamically create cards
    filterCards(data) // enable region filtering
  })

// ==============================
// FUNCTION: APPEND COUNTRIES TO DOM
// ==============================

function appendCountries(countries) {
    countries.forEach(country => {
        const countryHTML = `
            <div class="country">
                <img src="${country.flags.png}" alt="${country.name.common} flag" class="flag mb-4">
                <div class="more-padding">
                    <h5 class="country-name fw-bold mb-3">${country.name.common}</h5>
                    <div class="country-info">
                        <p class="population"><span class='fw-bold'>Population:</span> ${country.population.toLocaleString()}</p>
                        <p class="region"><span class='fw-bold'>Region:</span> ${country.region}</p>
                        <p class="capital-city"><span class='fw-bold'>Capital:</span> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    </div>
                </div>
            </div>
        `;

        countryContainer.innerHTML += countryHTML;
    });

    updateCountryCardBackgrounds();

    // Add click event to each card to expand info view
    const countriesCards = document.querySelectorAll('.country');
    countriesCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            homePage.classList.add("hide");
            expandedPage.classList.remove("hide");
            updateExpandedInfo(countries[index]); 
        });
    });
}


// ==============================
// FUNCTION: UPDATE COUNTRY CARD BACKGROUNDS
// ==============================

function updateCountryCardBackgrounds(mode) {
  let countryCards = document.querySelectorAll('.country');
  countryCards.forEach(card => {
    if (mode) {
      card.style.background = 'hsl(209, 23%, 22%)'; 
      card.style.color = 'white'; 
    } else {
      card.style.background = 'white'; 
      card.style.color = 'black'; 
    }
  });
}

// ==============================
// BACK BUTTON: RETURN TO HOME PAGE
// ==============================

backBtn.addEventListener("click", () => {
expandedPage.classList.add("hide");
homePage.classList.remove("hide");
})

// ==============================
// FUNCTION: ACTIVATE DROPDOWN HIGHLIGHT
// ==============================

function attachDropdownListener(){
dropDownItems.forEach(item => {
  item.addEventListener("click", () => {
    dropDownItems.forEach(i => i.classList.remove("active-dropdown"))
    item.classList.add('active-dropdown')
})
})
}


// ==============================
// FUNCTION: FILTER COUNTRIES BY REGION
// ==============================

function filterCards(){
dropDownItems.forEach(item => {
  item.addEventListener("click", () => {
    const countryCards = document.querySelectorAll('.country');
    countryCards.forEach(card => {
       const regionText = card.querySelector('.country-info .region').textContent;
      if(regionText.includes(item.innerHTML)){
        card.classList.remove('hide')
      }else{
        card.classList.add('hide')
      }
    })
})
})
}

// ==============================
// SEARCH FUNCTIONALITY
// Filters country cards based on user input
// ==============================

countrySearch.addEventListener('input', () => {
  const searchCountry = countrySearch.value.toLowerCase(); 
  const countries = document.querySelectorAll('.country');
  countries.forEach(card => {
    const countryName = card.querySelector('.country-name').textContent.toLowerCase(); 
    if (countryName.includes(searchCountry)) {
      card.classList.remove('hide');
    } else {
      card.classList.add('hide');
    }
  });
});


// ==============================
// CLEAR SEARCH BUTTON FUNCTIONALITY
// ==============================

clearButton.addEventListener("click", () => {
  countrySearch.value = ``;
  const countries = document.querySelectorAll('.country');
  countries.forEach(card => {
  card.classList.remove('hide');

  dropDownItems.forEach(item => {item.classList.remove('active-dropdown')
  
  })
})
});


// ==============================
// FUNCTION: DISPLAY EXPANDED COUNTRY INFORMATION
// ==============================

function updateExpandedInfo(country){
let native = Object.values(country.name.nativeName)[0].official;
let currency = Object.values(country.currencies)[0].name;
let languageList = Object.values(country.languages).join(', ');
let borderList = country.borders || [`None`]; 

// Construct expanded info HTML
let expandedCountryHtml = 

`<div class = "bigger-flag-container"><img src = "${country.flags.png}" class = "bigger-flag"></div>
        <div class =  "expanded-country-info-container">
            <h1 class = "expanded-country-name">${country.name.common}</h1>
            <div class = "d-flex">
                <p class = "spacing-container native-name"><span class = "fw-bold">Native Name: ${native}</span></p>
                <p class="top-level-domain"><span class="fw-bold">Top Level Domain: ${country.tld[0]}</span></p>
            </div>
            <div class="d-flex">
                <p class="spacing-container native-name"><span class="fw-bold">Population: ${country.population.toLocaleString()}</span></p>
                <p class="currency-type"><span class="fw-bold">Currencies: ${currency}</span></p>
            </div>
            <div class="d-flex">
                <p class="native-name spacing-container"><span class="fw-bold">Region: ${country.region}</span></p>
                <p class="language"><span class="fw-bold">Languages: ${languageList}</span></p>
            </div>

            <p class="native-name"><span class="fw-bold">Sub Region: ${country.subregion}</span></p>
            <p class="native-name"><span class="fw-bold">Capital: ${country.capital ? country.capital[0] : 'N/A'}</span></p>

            <div class="border-country-container d-flex align-items-center">
            <p class="border-countries"><span class="fw-bold">Border Countries:</span></p>
            <div class="border-country-buttons d-flex gap-2 flex-wrap">

            </div>
        </div>

      </div>`

    
  clickableInfo.innerHTML = expandedCountryHtml;
// Add border country buttons dynamically
  let borderCountry = document.querySelector(`.border-country-buttons`)

  borderList.forEach(border => {
  let createNewBorderButton = `<button class="border-country-button">${border}</button>`
  borderCountry.innerHTML += createNewBorderButton
})
    // Add functionality to border country buttons
    let borderButtons = document.querySelectorAll('.border-country-button');
    borderButtons.forEach(button => {
        button.addEventListener('click', () => {
        let clicked = button.textContent;
        fetch('data.json')
        .then(response => response.json())
        .then(countries => {

         let matchedCountry = countries.find(c => c.cca3 === clicked);
         if (matchedCountry) {
         updateExpandedInfo(matchedCountry);
        }
      });
    });
 });
}

