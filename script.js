//Selecting the Elements
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorSelectors = document.querySelectorAll('[data-testid="colorSelectors"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let tarColor;
let score;

//Predefined array of color
const color = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5",
    "#FFC300", "#C70039", "#900C3F", "#581845", "#1A5276", "#1E8449"
]

function startNewGame() {
    gameStatus.textContent = "";

//Randomly Select a target color
    tarColor = color[Math.floor(Math.random() * color.length)];
    colorBox.style.backgroundColor = tarColor;


//Shuffle and assign Colors to buttons
const shuffleButton = [...color].sort(() => Math.random() - 0.5);
colorSelectors.forEach((button, index)=> {
    button.style.backgroundColor = shuffleButton[index];
    button.style.opacity = "1";
    button.style.pointerEvents = "auto";
});

//log
    console.log("Target Color (RGB):", hexToRgb(tarColor));

}

//Convert HEX to RGB with helper function
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    const bigInt = parseInt(hex, 16);
   const  r = (bigInt >> 16) & 255;
   const g =(bigInt >> 8) & 255;
   const b = bigInt & 255;

   return `rgb(${r}, ${g}, ${b})`;

}

function checkGuess(event) {
    const selectedColor =  event.target.style.backgroundColor;
    console.log("Selected Color:", selectedColor);


    const selectedColorHex =  rgbToHex(selectedColor);
    console.log("selected color (HEX):", selectedColorHex);
    console.log("target Color (HEX):", tarColor)

    if (!selectedColorHex) {
        gameStatus.textContent = "Invalid color! Try again. 😢";
        return; // Exit the function if the color is invalid
    }

    if(selectedColor === tarColor) {
        gameStatus.textContent = " Hurray Correct Guess 🎉 🎉 🎉";
        score++;
        scoreElement.textContent = `Score: ${score}`;
        startNewGame();
    } else{
        gameStatus.textContent = "No No, Wrong ! Try again 😔😞😞";
        event.target.style.opacity = "0.5";
        event.target.style.pointerEvents = "none";
    }
}


function rgbToHex(rgb) {

    if (!rgb || !rgb.startsWith("rgb")) {
        console.error("Invalid color format:", rgb);
        return null;
    }


    const [r, g, b] = rgb.match(/\d+/g).map(Number);


    const toHex = (n) => n.toString().padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

colorSelectors.forEach(button => {
    button.addEventListener('click', checkGuess);

});

newGameButton.addEventListener('click', () => {
    score=0;
    scoreElement.textContent = `score: ${score}`;
    startNewGame();
});

startNewGame();