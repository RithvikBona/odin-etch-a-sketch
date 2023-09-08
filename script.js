const slider = document.querySelector('#slider');
const sliderText = document.querySelector('.sliderText');
const pxCont = document.getElementById('pixelContainer');
let isMouseDown = false;
let isEraser = 

function createGrid(num) {
    pxCont.replaceChildren();
    pxCont.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    pxCont.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (let i = 0; i < num * num; i++) {
        const pxl = document.createElement("div");
        pxl.classList.add('pxl');
        //pxl.textContent = `${i}`;
        pxl.onmousedown = function () { isMouseDown = true };
        pxl.onmouseup = function () { isMouseDown = false };



        pxl.onmouseover = function () {
            if (isMouseDown) {
                pxl.classList.add('hovered');
            }
        }
        pxCont.appendChild(pxl);
    }
}

createGrid(16);

slider.addEventListener('input', (e) => {
    let sliderVal = document.getElementById('slider').value
    sliderText.textContent = `${sliderVal} X ${sliderVal}`;
    createGrid(sliderVal);
});

const eraserBtn = document.querySelector('#eraserBtn');
eraserBtn.addEventListener('click', (e) => {
    
});

