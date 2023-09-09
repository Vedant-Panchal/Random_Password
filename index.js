let passInput = document.getElementById("numberInput");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let generatePass = document.getElementById("generatePass");
let passDiv = document.querySelector('.pass'); 
let copyBtn = document.querySelector('.copyIcon');
let clear = document.querySelector('#clear');

plus.addEventListener("click", function () {
    if (parseInt(passInput.value) < 15)
        passInput.value = parseInt(passInput.value) + 1;
})

minus.addEventListener("click", function () {
    if (parseInt(passInput.value) > 1)
        passInput.value = parseInt(passInput.value) - 1;
})

const upprCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const lowCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];

const utils = {
    getRandomNumBetween: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    getCharFromArray: (array, num) => {
        let chars = '';
        for (let i = 0; i < num; i++) {
            const randNumber = utils.getRandomNumBetween(0, array.length - 1);
            chars += array[randNumber];
        }
        return chars;
    }
}

function generatePassw() {
    const passLength = parseInt(passInput.value);
    const includeNums = document.getElementById('includeNums').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    let tempPass = '';

    const totalCharTypes = (includeNums ? 1 : 0) + (includeSymbols ? 1 : 0) + (uppercase ? 1 : 0) + (lowercase ? 1 : 0);

    const charsPerType = Math.floor(passLength / totalCharTypes);

    if (includeNums) {
        tempPass += utils.getCharFromArray(numbers, charsPerType);
    }
    if (includeSymbols) {
        tempPass += utils.getCharFromArray(symbols, charsPerType);
    }
    if (uppercase) {
        tempPass += utils.getCharFromArray(upprCase, charsPerType);
    }
    if (lowercase) {
        tempPass += utils.getCharFromArray(lowCase, charsPerType);
    }

    // Fill in the remaining characters with random characters if needed
    while (tempPass.length < passLength) {
        const remainingChars = passLength - tempPass.length;
        tempPass += utils.getCharFromArray([...upprCase, ...lowCase, ...numbers, ...symbols], remainingChars);
    }

    // Shuffle the characters to ensure randomness
    tempPass = tempPass.split('').sort(() => Math.random() - 0.5).join('');
    
    // Populate the div elements with the generated passwords
    passDiv.textContent = tempPass;
}

generatePass.addEventListener("click", generatePassw);

copyBtn.addEventListener("click",function(e) {
    console.log('Icon clicked');
    if(e.currentTarget.value == '')return;
    const passCopy = passDiv.textContent;
    navigator.clipboard.writeText(passCopy)
    passDiv.textContent = 'Copied !';
})

clear.addEventListener("click",()=>{
    passDiv.textContent = '';
    passInput.value = '8';
    document.getElementById('includeNums').checked = false;
    document.getElementById('includeSymbols').checked = false;
    document.getElementById('uppercase').checked = false;
    document.getElementById('lowercase').checked = false;
});