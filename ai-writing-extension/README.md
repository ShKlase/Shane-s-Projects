RefineRight – AI Writing Assistant (Browser Extension)

Description:
RefineRight is a lightweight Chrome browser extension that improves writing clarity, grammar, and word choice using AI-powered language correction. It allows users to paste text directly into a popup window for refinement, or toggle a “smart vocabulary” mode that automatically replaces dull words across webpages. The project integrates a frontend Chrome extension (popup interface and content script) with a Node.js + Express backend, which communicates with the OpenAI API for grammar and clarity improvements. It highlights full-stack integration, API communication, and DOM manipulation through Chrome’s extension environment. (Help from YouTube and other professors was necessary)

Key Features:
1. AI Grammar Improvement
User enters or pastes text in the popup window and clicks “Improve Writing.”
Sends the text to a local Express backend (localhost:3000) which forwards it to OpenAI’s API.
Returns a cleaned and refined version of the input.

Note: The AI improvement button currently does not function in this public version, as no OpenAI API key is included for security reasons.
The backend request structure is implemented and fully functional once a valid key is provided in .env.

2. Smart Vocabulary Enhancement
A toggle switch activates a content script that automatically replaces over 150 “dull” or overused words on webpages with more vivid alternatives. Uses Chrome’s scripting API and a custom text-walking algorithm to replace words in real time.

3. Chrome Extension Architecture
Popup UI for direct writing improvement.
Background logic handles communication between popup, content, and backend.

4. Backend Integration (Express Server)
Runs locally on prt 3000.
Handles POST requests from the popup and forwards them to the OpenAI Chat Completions endpoint.
Implements CORS for safe local communication with the extension.

Technologies Used
Frontend HTML, CSS, JavaScript, Bootstrap, FontAwesome, Popup UI, layout, and interactivity
Backend	Node.js, Express, CORS, dotenv, Handles AI requests securely
AI Model (Planned) OpenAI API (GPT-3.5-Turbo)

How to Run Locally:
Step 1: Backend Setup
Make sure Node.js is installed.
Navigate to the project’s backend folder:
cd server
npm install express cors dotenv node-fetch
Create a .env file in /server with:
OPENAI_API_KEY=your_api_key_here
Run the server:
node server.js
The backend should start at http://localhost:3000.

Step 2: Load the Extension
Open Chrome → go to chrome://extensions/
Enable Developer Mode (top right).
Click Load unpacked → select the project folder.
The extension icon should appear in your toolbar.

Step 3: Use RefineRight
Click the icon → paste text → press “Improve Writing.”
Toggle the switch to activate the “Replace Dull Words” feature on any webpage.
Reminder: The AI improvement feature won’t work without an API key connected to a running backend.

Difficulty:
Intermediate – Advanced
Ideal for demonstrating full-stack web development, Chrome extension scripting, and AI integration planning.