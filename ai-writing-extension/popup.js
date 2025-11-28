// Select UI elements from popup.html
let improveBtn = document.getElementById("improveBtn");
let userInput = document.getElementById("userInput");
    // When the user clicks “Improve Writing”
    improveBtn.addEventListener("click", () => {
        let originalText = userInput.value;
        // Send the text to the backend API for AI-based correction
        fetch("http://localhost:3000/correct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: originalText })
        })
          .then(res => res.json())
          .then(data => {
            // Extract AI response or fallback if none
            const correctedText = data.choices?.[0]?.message?.content || "No result.";
            document.getElementById("output").textContent = correctedText;
          })
          .catch(err => {
            console.error("Error:", err);
          });
      });

      // Wait until popup is loaded, then add listener for toggle switch
      document.addEventListener("DOMContentLoaded", () => {
        const toggleSwitch = document.getElementById("toggleSwitch");
        // When the switch is toggled
        toggleSwitch.addEventListener("change", () => {
          // Identify the currently active tab
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;
            // Inject content.js into the page if not already active
            chrome.scripting.executeScript({
              target: { tabId },
              files: ["content.js"]
            }, () => {
              // Determine which action to send to the content script
              let action;
              if (toggleSwitch.checked) {
                action = "highlight";
              }else{
                action = "removeHighlight";
              }

              chrome.tabs.sendMessage(tabId, {action});
              });
            });
          });
        });
      

