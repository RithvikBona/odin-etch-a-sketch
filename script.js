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
                    pxl.style.backgroundColor = `rgb(${RGBVals.join(',')})`
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






//HSL Converter Credit to StackOverflow User Mohsen
//https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hslToRgb(h, s, l) {
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1.0/3.0);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1.0/3.0);
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }  
  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1.0/6.0) return p + (q - p) * 6 * t;
    if (t < 1.0/2.0) return q;
    if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6;
    return p;
  }