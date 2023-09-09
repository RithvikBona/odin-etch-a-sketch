const slider = document.querySelector('#slider');
const sliderText = document.querySelector('.sliderText');
const pxCont = document.getElementById('pixelContainer');
const colorPicker = document.getElementById('colorPicker');
let penColor = colorPicker.value;
let isMouseDown = false;
let isEraser =  false;
let isRainbow = false;

function createGrid(num) {
    pxCont.replaceChildren();
    pxCont.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    pxCont.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (let i = 0; i < num * num; i++) {
        const pxl = document.createElement("div");
        pxl.classList.add('pxl');
        pxl.setAttribute('id', `pxl${i}`);
        pxl.onmousedown = function () { isMouseDown = true };
        pxl.onmouseup = function () { isMouseDown = false };



        pxl.onmouseover = function () {
            if (isMouseDown) {
                if(isEraser) {
                    pxl.style.backgroundColor = 'white';
                } else if(isRainbow){
                    let RGBVals = getRandomColor();
                    pxl.style.backgroundColor = `#${RGBVals.r}${RGBVals.g}${RGBVals.b}`;
                } else {
                    pxl.style.backgroundColor = penColor;
                }
                
            }
        }
        pxCont.appendChild(pxl);
    }
}

//Want to create pleasing colors, so using HSV and the Golden Ratio Constant for even color
//spacing
let h = Math.random(); //start with initial randomness
function getRandomColor() {
    goldenRatioConst = 0.618033988749895;
    h += goldenRatioConst; //continously add golden Ratio Constant which makes even spacing
    h %= 1; //so decimal between 0 and 1
    //let h = Math.random();
    return HSVtoRGB(h, 0.96, 0.92);
}



createGrid(16);

//listner stuff

slider.addEventListener('input', (e) => {
    let sliderVal = document.getElementById('slider').value
    sliderText.textContent = `${sliderVal} X ${sliderVal}`;
    createGrid(sliderVal);
});

const eraserBtn = document.querySelector('.eraserBtn');
eraserBtn.addEventListener('click', (e) => {
    isEraser = !isEraser;
    eraserBtn.classList.toggle("btnPressed");
    isRainbow = false; //no dupes
    rainbowBtn.classList.remove("btnPressed");
});

const clearBtn = document.querySelector(".clearBtn");
clearBtn.addEventListener('click', (e) => {
    createGrid(slider.value);
});

colorPicker.addEventListener('input', (e) => {
    penColor = colorPicker.value;
})

const rainbowBtn = document.querySelector(".rainbowBtn");
rainbowBtn.addEventListener('click', (e) => {
    isRainbow = !isRainbow;
    rainbowBtn.classList.toggle("btnPressed")
    //
    isEraser = false;
    eraserBtn.classList.remove("btnPressed");
});






//Credit to Stack Overflow User Parthik Gosar
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
