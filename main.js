
const grid = document.querySelector('.grid');
const reset = document.getElementById('reset');
const eraser = document.getElementById('eraser');
const black = document.getElementById('black');
const colorBtn = document.getElementById('colorBtn')
const colorValue = document.getElementById('color');
const slider = document.getElementById('slider');
const sliderValue = document.querySelector('.value');
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'black';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = true)

function setCurrentColor(newColor) {
	currentColor = newColor;
}

function setCurrentMode(newMode) {
	activateButton(newMode);
	currentMode = newMode;
}

black.onclick = () => setCurrentMode('black');
rainbow.onclick = () => setCurrentMode('rainbow');
eraser.onclick = () => setCurrentMode('eraser');
colorBtn.onclick = () => setCurrentMode('color');
reset.onclick = () => createGrid();


function activateButton(newMode) {
	if (currentMode === 'rainbow') {
		rainbow.classList.remove('active');
	} else if (currentMode === 'color') {
		colorBtn.classList.remove('active');
	} else if (currentMode === 'eraser') {
		eraser.classList.remove('active');
	} else if (currentMode === 'black') {
		black.classList.remove('active');
	}

	if (newMode === 'rainbow') {
		rainbow.classList.add('active');
	} else if (newMode === 'color') {
		colorBtn.classList.add('active');
	} else if (newMode === 'eraser') {
		eraser.classList.add('active');
	} else if (newMode === 'black') {
		black.classList.add('active');
	}
}

function changeColor(e) {
	if (e.type === 'mouseover' && !mouseDown) return;
	if (currentMode === 'rainbow') {
		const randomR = Math.floor(Math.random() * 256);
		const randomG = Math.floor(Math.random() * 256);
		const randomB = Math.floor(Math.random() * 256);
		e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
	} else if (currentMode === 'color') {
		e.target.style.backgroundColor = colorValue.value;
	} else if (currentMode === 'eraser') {
		e.target.style.backgroundColor = '#ffffff';
	} else if (currentMode === 'black') {
		e.target.style.background = '#000000';
	}
}

slider.addEventListener('input', function(){
	let val = document.getElementById('slider').value;
	sliderValue.textContent = val;
	removeCells(grid);
	grid.style.gridTemplateColumns = (`repeat(${val}, 2fr`);
	grid.style.gridTemplateRows = (`repeat(${val}, 2fr`);
	for (let i = 0; i < val * val; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.addEventListener('mouseover', changeColor);
		cell.addEventListener('mousedown', changeColor);
		grid.appendChild(cell);
	}
});

function createGrid() {
	removeCells(grid);
	let val = document.getElementById('slider').value;
	sliderValue.textContent = val;
	grid.style.gridTemplateColumns = (`repeat(${val}, 2fr`);
	grid.style.gridTemplateRows = (`repeat(${val}, 2fr`);
	for(let i = 0; i < val * val; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.addEventListener('mouseover', changeColor);
		cell.addEventListener('mousedown', changeColor);
		grid.appendChild(cell);
	}
}

function removeCells(parent){
	while(grid.firstChild){
		grid.removeChild(grid.firstChild);
	}
}

window.onload = () => {
	createGrid(DEFAULT_SIZE);
	activateButton(DEFAULT_MODE);
}