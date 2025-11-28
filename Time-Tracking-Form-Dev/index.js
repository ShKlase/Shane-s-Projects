let data = [
{
    "title": "Work",
    "timeframes": {
      "daily": {
        "current": 5,
        "previous": 7
      },
      "weekly": {
        "current": 32,
        "previous": 36
      },
      "monthly": {
        "current": 103,
        "previous": 128
      }
    }
  },
  {
    "title": "Play",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 2
      },
      "weekly": {
        "current": 10,
        "previous": 8
      },
      "monthly": {
        "current": 23,
        "previous": 29
      }
    }
  },
  {
    "title": "Study",
    "timeframes": {
      "daily": {
        "current": 0,
        "previous": 1
      },
      "weekly": {
        "current": 4,
        "previous": 7
      },
      "monthly": {
        "current": 13,
        "previous": 19
      }
    }
  },
  {
    "title": "Exercise",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 1
      },
      "weekly": {
        "current": 4,
        "previous": 5
      },
      "monthly": {
        "current": 11,
        "previous": 18
      }
    }
  },
  {
    "title": "Social",
    "timeframes": {
      "daily": {
        "current": 1,
        "previous": 3
      },
      "weekly": {
        "current": 5,
        "previous": 10
      },
      "monthly": {
        "current": 21,
        "previous": 23
      }
    }
  },
  {
    "title": "Self Care",
    "timeframes": {
      "daily": {
        "current": 0,
        "previous": 1
      },
      "weekly": {
        "current": 2,
        "previous": 2
      },
      "monthly": {
        "current": 7,
        "previous": 11
      }
    }
  }



]
let buttons = document.querySelectorAll(".daily");

function activateClickedButton(event){
  buttons.forEach(b => b.classList.remove("active"));
    let clickedButton = event;
      
    clickedButton.classList.add("active");
    
}

function clearActivities(){
  const activities = document.querySelectorAll(".first-boxes")
  activities.forEach(a => a.remove())
}


function renderCards(clickedOption){
    clearActivities();
    const activityTracker = document.querySelector(".six-boxes")

   function calcTimeFrame(option){
    if(option === "daily"){
      return "Yesterday"
    }else if(option === "weekly"){
      return "Last Week"
    }else if (option === "monthly"){
      return "Last Month"
    }
   }



  data.forEach(activity => {
    const name = activity.title;
    const activityClass = name.toLowerCase().replace(" ", "-");
    const timeframeData = activity.timeframes[clickedOption]
    const previousTimeframe = calcTimeFrame(clickedOption)
    const section = document.createElement("section");
    section.classList.add("help-me");
    const stringtoInject = 
    `

  <div class=first-boxes>
    <div class="color-background ">
      <div class="dark-blue-backgrounds">
        <div class=word-container>
          <div class="elipses">${name}
            <img class="elpisesimg" src="./images/icon-ellipsis.svg">
          </div>


          <h1 class="hours">${timeframeData.current}</h1> 
          <p class="previous">${previousTimeframe} - ${timeframeData.previous}</p> 

        </div>
      
  `
  section.innerHTML = stringtoInject
    activityTracker.append(section)
  });
}







buttons.forEach(button => {
  button.addEventListener("click", () => {
    activateClickedButton(button); 
    const clickedOption = button.dataset.option
    renderCards(clickedOption);
  })
  
});

buttons[1].click()
