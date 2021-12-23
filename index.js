let root = document.documentElement;
let resetButton = document.querySelector('#reset-button');
let grid = document.querySelector('#grid');
let customColor = document.querySelector('#custom');
let sizeText = document.querySelector('#size');
let sizeBar = document.querySelector('#sizebar')
let paints = document.querySelectorAll('#paints button');

let mouseDown = false;
root.addEventListener('mousedown', () => mouseDown = true);
root.addEventListener('mouseup', () => mouseDown = false);

let paintColor = 'black';
defaultGridSize = 50;

let rainbow = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'darkviolet']

createGrid(defaultGridSize);

function random(max) {
    return Math.floor(Math.random() * max);
};

function paint(tar, color) {
    if(color=='default') {
        tar.style.backgroundColor = 'darkgray';
        tar.style.border = '0.5px solid gray';
    } else {
        tar.style.backgroundColor = `${color}`;
        tar.style.border = `${color}`;
    };
};

function createGrid(size) {
    root.style.setProperty('--grid-cols', `${size}`);
    root.style.setProperty('--grid-rows', `${size}`);
    for (i=1;i<=size*size;i++) {
        cell = document.createElement('div');
        cell.style.backgroundColor = 'darkgray';
        cell.style.border = '0.5px solid gray';
        cell.dataset.darken = '100';
        cell.style.filter = `brightness(${cell.dataset.darken}%)`
        cell.addEventListener('mouseover', (e) => paintSelector(e));
        cell.addEventListener('mousedown', (e) => {
            mouseDown = true;
            paintSelector(e);
        });
        grid.appendChild(cell).className = 'cell';
    };
}

function paintSelector(e) {
    if (mouseDown) {
        if (paintColor == 'darken') {
            e.target.dataset.darken = `${e.target.dataset.darken - 10}`
            e.target.style.filter = `brightness(${e.target.dataset.darken}%)`;
            console.log(e.target.style.filter);
        }
        else if (paintColor == 'rainbow') paint(e.target, rainbow[random(7)]);
        else if (paintColor == 'custom') paint(e.target, custom)
        else if (paintColor == 'eraser') paint(e.target, 'default');
        else paint(e.target, paintColor);
}};

function deleteGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    };
};

resetButton.addEventListener('click', () => {
    let gridSize = document.querySelector('.container input').value
    deleteGrid();
    createGrid(gridSize);
});
    
paints.forEach((button) => button.addEventListener('click', (e) => {
    paintColor = button.textContent.toLowerCase();
    paints.forEach((button) => button.classList.remove('selected'));
    button.classList.add('selected');
}));

customColor.addEventListener('input', (e) => custom = customColor.value);
sizeBar.addEventListener('change', (e) => sizeText.textContent = `${sizeBar.value} x ${sizeBar.value}`);
sizeBar.addEventListener('input', (e) => sizeText.textContent = `${sizeBar.value} x ${sizeBar.value}`);