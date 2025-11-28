// Handles dynamic data loading, display updates, and interactive behavior
let planetBtns = document.querySelectorAll(".planet-btn");
let planetImgContainer = document.querySelector(".planet-img");
let planetInfo =  document.querySelector(".planet-information");
let planetFacts = document.querySelector(".facts-grid");
let planetInfoBtns =  document.querySelectorAll(".planet-info-btn");


//Load planet data from local JSON file
fetch(`data.json`)
.then(response => response.json())
 .then(data => {
    determinePlanetInfo(data);
    attachListeners(data)
})

determinePlanetInfo()


function determinePlanetInfo(data) {
  planetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const planetName = btn.innerText.toLowerCase();
      updatePlanetInfo(data, planetName);  // show initial planet
    });
  });


}
//Update displayed planet info based on selection
function updatePlanetInfo(data, planet){
  // Update text and image content dynamically
   const planetData = data[planet];
   planetImgContainer.innerHTML = `<img src="./assets/planet-${planet}.svg" class ="planet w-100">`
   planetInfo.innerHTML = `<h1 class = "planet-info-header mb-4">${planetData.name}</h1>
            <p class = "planet-info"> ${planetData.overview.content}
            </p>
            <div>
                <span class ="source mt-3">Source :</span>
                <a href=${planetData.overview.source} class = "wiki-link  ml-1">Wikipedia</a>
                <button class="source-btn ml-1"><img src="./assets/icon-source.svg"></button>
            </div>
            <div class="planet-info-btns">
                <button class="planet-info-btn"><span class ="planet-nmbrs">01</span> Overview</button>
                <button class="planet-info-btn"><span class="planet-nmbrs">02</span> Internal Structure</button>
                <button class="planet-info-btn"><span class="planet-nmbrs">03</span> Surface Geology</button>
            </div>`

    
    planetFacts.innerHTML = `<div class="fact-box"><h6 class = "fact-header">Rotation Time</h6>
            <div class = "rotation-time">${planetData.rotation}</div>
        </div>
        <div class="fact-box"><h6 class="fact-header">Revolution Time</h6>
            <div class="revolution-time">${planetData.revolution}</div>
        </div>
        <div class="fact-box"><h6 class="fact-header">Radius</h6>
        <div class="radius">${planetData.radius}</div>
        </div>
        <div class="fact-box"><h6 class="fact-header">Average Temp.</h6>
        <div class="average-temp">${planetData.temperature}</div>
        </div>`

attachListeners(data);

   document.querySelectorAll(".planet-info-btn").forEach((btn) => {
        const span = btn.querySelector("span").innerText;
        if (span === "01") {  
            btn.style.backgroundColor = planetData.color;
        } else {
            btn.style.backgroundColor = "transparent"; 
        }
    });
}

function attachListeners(data) {
  const planetInfoBtns = document.querySelectorAll(".planet-info-btn");
  planetInfoBtns.forEach(btn => {
    btn.addEventListener("click", () => {
    
      const planet = document.querySelector(".planet-info-header").innerText.toLowerCase();
      const span = btn.querySelector("span").innerText;
      const planetColor = data[planet].color;
      console.log(planetColor)

        document.querySelectorAll(".planet-info-btn").forEach(b => {
        b.style.backgroundColor = "transparent";
      });
      btn.style.backgroundColor = planetColor;
      

      console.log(btn.style.backgroundColor)
      if (span === "01") {
        updatePlanetInfo(data, planet); 
            document.querySelectorAll(".planet-info-btn").forEach(newBtn => {
        const newSpan = newBtn.querySelector("span").innerText;
        if (newSpan === span) {
            newBtn.style.backgroundColor = planetColor; // Apply color to the clicked button
        } else {
            newBtn.style.backgroundColor = "transparent"; // Reset others to transparent
        }
    });
      } else if (span === "02") {
        planetImgContainer.innerHTML = `<img src="./assets/planet-${planet}-internal.svg" class ="planet w-100">`;
        planetInfo.innerHTML = `<h1 class="planet-info-header mb-4">${data[planet].name}</h1>
          <p class="planet-info">${data[planet].structure.content}</p>
          <div>
            <span class="source mt-3">Source :</span>
            <a href="${data[planet].structure.source}" class="wiki-link ml-1">Wikipedia</a>
            <button class="source-btn ml-1"><img src="./assets/icon-source.svg"></button>
          </div>
            <div class="planet-info-btns">
            <button class="planet-info-btn"><span class ="planet-nmbrs">01</span> Overview</button>
            <button class="planet-info-btn"><span class="planet-nmbrs">02</span> Internal Structure</button>
            <button class="planet-info-btn"><span class="planet-nmbrs">03</span> Surface Geology</button>
          </div>`
          attachListeners(data);
            document.querySelectorAll(".planet-info-btn").forEach(newBtn => {
        const newSpan = newBtn.querySelector("span").innerText;
        if (newSpan === span) {
            newBtn.style.backgroundColor = planetColor; 
        } else {
            newBtn.style.backgroundColor = "transparent"; 
        }
    });
      } else if (span === "03") {
        planetImgContainer.innerHTML = `<img src="./assets/geology-${planet}.png" class="planet w-100">`;
        planetInfo.innerHTML = `<h1 class="planet-info-header mb-4">${data[planet].name}</h1>
          <p class="planet-info">${data[planet].geology.content}</p>
          <div>
            <span class="source mt-3">Source :</span>
            <a href="${data[planet].geology.source}" class="wiki-link ml-1">Wikipedia</a>
            <button class="source-btn ml-1"><img src="./assets/icon-source.svg"></button>
          </div>
          <div class="planet-info-btns">
            <button class="planet-info-btn"><span class ="planet-nmbrs">01</span> Overview</button>
            <button class="planet-info-btn"><span class="planet-nmbrs">02</span> Internal Structure</button>
            <button class="planet-info-btn"><span class="planet-nmbrs">03</span> Surface Geology</button>
          </div>
          `

          attachListeners(data);
              document.querySelectorAll(".planet-info-btn").forEach(newBtn => {
        const newSpan = newBtn.querySelector("span").innerText;
        if (newSpan === span) {
            newBtn.style.backgroundColor = planetColor; 
        } else {
            newBtn.style.backgroundColor = "transparent"; 
        }
    });
      }
      
    });
    
  });
}




