// Header navigation bar functionality-----------------------------------------------

// Hamburger menu animation function
function myFunction(x) {
  x.classList.toggle("change");
}
// Navigation bar toggle function
function toggleNavbar() {
  var x = document.getElementById("myNavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

// Home introduction functionality-----------------------------------------------

// Text animation function ---------------------------------------------------------------
const textList = ["a designer.", "an illustrator.", "an animator.", "a storyteller.", "a web designer"];
const rotatingTextElement = document.getElementById('rotating-text');
let currentIndex = 0;

function updateText() {
        // Remove the previous text
    rotatingTextElement.classList.remove('text-animation');
        
        // Update the text
    rotatingTextElement.textContent = textList[currentIndex];
        
        // Force a reflow/repaint to ensure the animation restarts
     void rotatingTextElement.offsetWidth;
        
        // Re-add the text-animation class to trigger the animation
    rotatingTextElement.classList.add('text-animation');

        // Move to the next text item and adds to index counter
    currentIndex = (currentIndex + 1) % textList.length;
}

// Call the function immediately and then every few seconds
updateText(); // Initial call
setInterval(updateText, 2500); 

