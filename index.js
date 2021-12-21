let root = document.documentElement;
let resetButton = document.querySelector('#reset-button');
let grid = document.querySelector('#grid');
let customColor = document.querySelector('#custom');
let sizeText = document.querySelector('#size');
let sizeBar = document.querySelector('#sizebar')

let mouseDown = false;
root.addEventListener('mousedown', () => mouseDown = true);
root.addEventListener('mouseup', () => mouseDown = false);

let paintColor = 'black';
defaultGridSize = 50;

createGrid(defaultGridSize);

function createGrid(size) {
    root.style.setProperty('--grid-cols', `${size}`);
    root.style.setProperty('--grid-rows', `${size}`);
    for (i=1;i<=size*size;i++) {
        cell = document.createElement('div');
        cell.style.backgroundColor = 'darkgray';
        cell.style.border = '0.5px solid gray';
        cell.addEventListener('mouseover', (e) => {
        if (mouseDown) {
            if (paintColor == 'rainbow') e.target.style.backgroundColor = `${randomColor()}`;
            else if (paintColor == 'custom') e.target.style.backgroundColor = `${custom}`;
            else e.target.style.backgroundColor = `${paintColor}`}});
        grid.appendChild(cell).className = 'cell';
    };
};

function deleteGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    };
};

function random(max) {
    return Math.floor(Math.random() * max);
};

function randomColor() {
    r = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    return r;
};

resetButton.addEventListener('click', () => {
    let gridSize = document.querySelector('.container input').value
    deleteGrid();
    createGrid(gridSize);
});


backgrounds = document.querySelectorAll('#backgrounds button');
backgrounds.forEach(button => button.addEventListener('click', (e) => {
    backgroundColor = button.textContent.toLowerCase();
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        if(cell.style.backgroundColor=='white'||cell.style.backgroundColor=='black'){
            cell.style.backgroundColor = `${backgroundColor}`
        }})}));

    
paints = document.querySelectorAll('#paints button');
paints.forEach((button) => button.addEventListener('click', (e) => {
    paintColor = button.textContent.toLowerCase();
}));

customColor.addEventListener('input', (e) => custom = customColor.value);
sizeBar.addEventListener('change', (e) => sizeText.textContent = `${sizeBar.value} x ${sizeBar.value}`);
sizeBar.addEventListener('input', (e) => sizeText.textContent = `${sizeBar.value} x ${sizeBar.value}`);