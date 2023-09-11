const slider = document.querySelector('#slider');
const sliderText = document.querySelector('.sliderText');
const pxCont = document.getElementById('pixelContainer');
const colorPicker = document.getElementById('colorPicker');
let penColor = colorPicker.value;
//button toggles
let isMouseDown = false;
let isEraser = false;
let isRainbow = false;
let isDarken = false;
let isLighten = false;
let isGridLines = true;

function createGrid(num) {
    pxCont.replaceChildren();
    pxCont.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    pxCont.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (let i = 0; i < num * num; i++) {
        const pxl = document.createElement("div");
        pxl.classList.add('pxl');
        if (!isGridLines) {
            pxl.classList.add('pxlBorderHide');
        }
        pxl.onmousedown = function () { isMouseDown = true };
        pxl.onmouseup = function () { isMouseDown = false };



        pxl.onmouseover = function () {
            if (isMouseDown) {
                if (isEraser) {
                    pxl.style.backgroundColor = 'white';
                } else if (isRainbow) {
                    let RGBVals = getRandomColor();
                    pxl.style.backgroundColor = `rgb(${RGBVals.join(',')})`
                } else if (isDarken) {
                    let rgbNums = pxl.style.backgroundColor.substring(4, pxl.style.backgroundColor.length - 1);
                    pxl.style.backgroundColor = darken(rgbNums);
                } else if (isLighten) {
                    let rgbNums = pxl.style.backgroundColor.substring(4, pxl.style.backgroundColor.length - 1);
                    pxl.style.backgroundColor = lighten(rgbNums);
                } else {
                    pxl.style.backgroundColor = penColor;
                }

            }
        }
        pxCont.appendChild(pxl);
    }
}

function darken(rgbNums) {
    let rgbArr = (rgbNums != "") ? (rgbNums.split(',')) : ["255", "255", "255"];

    let rInit = rgbArr[0].trim();
    let gInit = rgbArr[1].trim();
    let bInit = rgbArr[2].trim();

    //reduce rgb vals by 17 each time, or set to 0 if negative
    let r = (rInit > 17) ? (rInit - 17) : 0;
    let g = (gInit > 17) ? (gInit - 17) : 0;
    let b = (bInit > 17) ? (bInit - 17) : 0;

    return `rgb(${r},${g},${b})`;
}

function lighten(rgbNums) {
    let rgbArr = (rgbNums != "") ? (rgbNums.split(',')) : ["255", "255", "255"];
    let rInit = rgbArr[0].trim();
    let gInit = rgbArr[1].trim();
    let bInit = rgbArr[2].trim();

    //increase rgb vals by 17 each time, or set to 255 if it goes past
    let r = (rInit < 238) ? (rInit * 1 + 17) : 255;
    let g = (gInit < 238) ? (gInit * 1 + 17) : 255;
    let b = (bInit < 238) ? (bInit * 1 + 17) : 255;

    return `rgb(${r},${g},${b})`;
}



//Want to create pleasing colors, so using HSV and the Golden Ratio Constant for even color
//spacing
let h = Math.random(); //start with initial randomness
function getRandomColor() {
    goldenRatioConst = 0.618033988749895;
    h += goldenRatioConst; //continously add golden Ratio Constant which makes even spacing
    h %= 1; //so decimal between 0 and 1
    return hslToRgb(h, 0.8, 0.5);
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
    //
    isRainbow = false;
    rainbowBtn.classList.remove("btnPressed");
    isDarken = false;
    darkenBtn.classList.remove("btnPressed");
    isLighten = false;
    lightenBtn.classList.remove('btnPressed');
});

const clearBtn = document.querySelector(".clearBtn");
clearBtn.addEventListener('click', (e) => {
    createGrid(slider.value);
});

const toggleGridBtn = document.querySelector('.toggleGrid');
toggleGridBtn.addEventListener('click', (e) => {
    isGridLines = !isGridLines;
    toggleGridBtn.classList.toggle("btnPressed");
    let pxlList = document.getElementsByClassName("pxl");
    for (let index = 0; index < pxlList.length; index++) {
        pxlList[index].classList.toggle('pxlBorderHide');

    }
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
    isDarken = false;
    darkenBtn.classList.remove("btnPressed");
    isLighten = false;
    lightenBtn.classList.remove('btnPressed');
});

const darkenBtn = document.querySelector(".darkenBtn");
darkenBtn.addEventListener('click', (e) => {
    isDarken = !isDarken;
    darkenBtn.classList.toggle("btnPressed")
    //
    isEraser = false;
    eraserBtn.classList.remove("btnPressed");
    isRainbow = false;
    rainbowBtn.classList.remove("btnPressed");
    isLighten = false;
    lightenBtn.classList.remove('btnPressed');
});

const lightenBtn = document.querySelector(".lightenBtn");
lightenBtn.addEventListener('click', (e) => {
    isLighten = !isLighten;
    lightenBtn.classList.toggle('btnPressed');
    //
    isEraser = false;
    eraserBtn.classList.remove("btnPressed");
    isRainbow = false;
    rainbowBtn.classList.remove("btnPressed");
    isDarken = false;
    darkenBtn.classList.remove("btnPressed");
});






//HSL Converter Credit to StackOverflow User Mohsen
//https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1.0 / 3.0);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1.0 / 3.0);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1.0 / 6.0) return p + (q - p) * 6 * t;
    if (t < 1.0 / 2.0) return q;
    if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6;
    return p;
}