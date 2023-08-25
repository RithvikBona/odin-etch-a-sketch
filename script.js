const pxCont = document.getElementById('pixelContainer');

function createGrid(num) {
    pxCont.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    pxCont.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for(let i = 0; i < num*num; i++) {
        const pxl = document.createElement("div");
        pxl.classList.add('pxl');
        //pxl.textContent = `${i}`;
        pxl.onmouseover = function() {
            pxl.classList.add('hovered');
        }
        pxCont.appendChild(pxl);
    }
}

createGrid(16);

