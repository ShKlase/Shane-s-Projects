// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "highlight") {
      highlightText();  // Replace dull words with stronger alternatives
    } else if (request.action === "removeHighlight") {
      removeHighlighting(); // Reload the page to remove any text changes
    }
  });

  // A mapping of common / dull words to stronger, more expressive alternatives
  const wordBoostMap = {
    "good": "excellent", "bad": "terrible", "nice": "remarkable", "thing": "asset", "stuff": "materials",
    "very": "", "really": "", "important": "crucial", "big": "massive", "small": "tiny",
    "happy": "ecstatic", "sad": "devastated", "angry": "furious", "mad": "enraged", "fast": "rapid",
    "slow": "sluggish", "smart": "brilliant", "dumb": "ignorant", "hard": "challenging", "easy": "straightforward",
    "fun": "entertaining", "boring": "tedious", "cool": "impressive", "hot": "scorching", "cold": "freezing",
    "tired": "exhausted", "hungry": "starving", "beautiful": "stunning", "ugly": "hideous", "strong": "powerful",
    "weak": "frail", "clean": "spotless", "dirty": "filthy", "new": "brand-new", "old": "ancient",
    "help": "assist", "use": "utilize", "make": "create", "do": "accomplish", "get": "obtain",
    "show": "demonstrate", "tell": "inform", "say": "express", "need": "require", "like": "enjoy",
    "love": "adore", "hate": "despise", "start": "commence", "stop": "cease", "talk": "converse",
    "walk": "stroll", "run": "sprint", "look": "glance", "see": "observe", "hear": "perceive",
    "think": "contemplate", "feel": "perceive", "try": "attempt", "plan": "strategize", "buy": "purchase",
    "sell": "market", "give": "donate", "take": "acquire", "eat": "consume", "drink": "sip",
    "live": "reside", "die": "perish", "build": "construct", "destroy": "demolish", "win": "triumph",
    "lose": "fail", "fight": "battle", "work": "labor", "job": "occupation", "man": "gentleman",
    "woman": "lady", "child": "youngster", "friend": "companion", "enemy": "opponent", "idea": "concept",
    "biggest": "largest", "smallest": "tiniest", "happy": "joyful", "sad": "sorrowful", "hard": "arduous",
    "simple": "elementary", "kind": "benevolent", "mean": "malicious", "funny": "hilarious", "scary": "terrifying",
    "quiet": "silent", "loud": "boisterous", "bright": "radiant", "dark": "gloomy", "rich": "wealthy",
    "poor": "impoverished", "pretty": "gorgeous", "ugly": "grotesque", "nice": "pleasant", "rude": "impolite",
    "clean": "immaculate", "dirty": "grimy", "soft": "plush", "rough": "abrasive", "tough": "resilient",
    "weak": "fragile", "strong": "robust", "old": "ancient", "new": "modern", "bad": "atrocious",
    "fast": "swift", "slow": "lethargic", "hard": "difficult", "easy": "effortless", "start": "initiate",
    "stop": "terminate", "begin": "commence", "end": "conclude", "go": "proceed", "come": "arrive",
    "leave": "depart", "ask": "inquire", "answer": "respond", "wait": "linger", "move": "relocate",
    "change": "transform", "grow": "develop", "read": "peruse", "write": "compose", "listen": "heed",
    "talk": "speak", "yell": "shout", "cry": "sob", "laugh": "chuckle", "smile": "grin",
    "frown": "scowl", "open": "unveil", "close": "shut", "hit": "strike", "kick": "boot",
    "throw": "hurl", "catch": "snag", "cut": "slice", "fix": "repair", "break": "shatter",
    "watch": "observe", "hear": "detect", "taste": "savor", "smell": "sniff", "touch": "feel",
    "win": "prevail", "lose": "surrender", "run": "dash", "jump": "leap", "sleep": "slumber",
    "wake": "arise", "think": "ponder", "understand": "comprehend", "forget": "overlook", "remember": "recall",
    "create": "fabricate", "destroy": "obliterate", "love": "cherish", "hate": "loathe", "play": "engage",
    "work": "toil", "study": "examine", "learn": "master", "teach": "educate", "help": "aid",
    "need": "necessitate", "want": "desire", "like": "favor", "dislike": "detest", "see": "notice"
  };
  
  // Utility function to iterate through all text nodes on the page (still a little confusing)
  function walkTextNodes(node, callback) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let textNode;
    while ((textNode = walker.nextNode())) {
      callback(textNode);
    }
  }
  
  // Replace "dull" words in text with their mapped "boosted" counterparts
  function replaceDullWords(text) {
    return text.split(/\b/).map(word => {
      const lower = word.toLowerCase();
      if (wordBoostMap[lower]) {
        return matchCase(word, wordBoostMap[lower]); // Preserve capitalization
      }
      return word;
    }).join("");
  }
  // Maintain proper casing
  function matchCase(original, replacement){
    if(replacement === ""){ // Some filler words (like “very”) get removed entirely
      return "";
    }
    if(original[0] === original[0].toUpperCase()){
      return replacement[0].toUpperCase() + replacement.slice(1);
    } else {
      return replacement;
    }
  }
  
// Highlight function — enhances text throughout the webpage, doesnt actually highlight
  function highlightText() {
    walkTextNodes(document.body, (textNode) => {
      const newText = replaceDullWords(textNode.textContent);
      if (newText !== textNode.textContent) {
        textNode.textContent = newText;
      }
    });
  }
  
  // Removes highlighting (reloads the original page)
  function removeHighlighting() {
    location.reload();
  }
  