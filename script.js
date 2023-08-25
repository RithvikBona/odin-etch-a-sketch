const pxCont = document.getElementById('pixelContainer');
let isMouseDown = false;

function createGrid(num) {
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



