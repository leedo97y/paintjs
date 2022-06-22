const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // -> Context can control pixel's in canvas
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2C2C2C";
const CANVAS_SIZE = 700;

// => when you want to use Canvas, you need css-size and js-size both !! 
canvas.width  = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


// [ Make Canvas Default Style ]
// 반복되는 값이 있으면 변수에 담아준다.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// = 하얀색 배경ㅇ로 저장해야 하므로 작성 -> 하기 전에는 js에서 bgc를 지정안해서 투명하게 저장됨
ctx.strokeStyle = INITIAL_COLOR; // color of line
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // line's width


// [[ VARIABLES ]] (default : false)
let painting = false;
let filling = false;

// [[ FUNCTION ]]
// [ StopPainting Code ] -> When Mouse leave canvas, it work
function stopPainting () {
  painting = false;
}

function startPainting () {
  painting = true;
}

// [ Detecting Mouse-Movement Code ]
// = mouse is always moving / just creating path = painting : false
function onMouseMove (event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //console.log("creating path in ", x, y);
    ctx.beginPath(); // creating path (no click just moving)
    ctx.moveTo(x, y); // move path to coordinate x,y
  } else {
    //console.log("creating line in ", x, y);
    ctx.lineTo(x, y); // can be a line from this coordinate (click)
    ctx.stroke(); // creating line => show line
  }
}
// -> screenX,Y = coordinate of Mouse in Whole-Area 
// -> offsetX,Y = coordinate of Mouse only in (= inside of) Canvas**


function handleColorClick (event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // override color 
  ctx.fillStyle = color;
}

function hadleRangeChange (event) {
  const size = event.target.value;
  ctx.lineWidth = size; // override size
}

function handleModeClick () {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick () {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
  
}

// Prevent using Right-Click to save image
function handleCM (event) {
  event.preventDefault();
}

function handleSaveCilck () {
  const image = canvas.toDataURL("image/png"); // default = png
  const link = document.createElement("a"); // Create fake-link by create <a> tag 
  link.href = image; // 다운로드할 이미지를 link로 만들어서 받는다.
  link.download = "PaintJS"; // the name of image
  link.click(); // Create fake-Click
}


// [[ IF'S ]]
if (canvas) {
  canvas.addEventListener("mousemove",  onMouseMove); // detecting Mouse-Movement EventCode
  canvas.addEventListener("mousedown", startPainting); // click EventCode
  canvas.addEventListener("mouseup", stopPainting); // un-click EventCode
  canvas.addEventListener("mouseleave", stopPainting); // mouse is in outside of canvas
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// [ Creating Array ]
// Colors - in Color add Event = by click, function name : handleColorClick
if (colors) {
  Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
  );
}


if (range) {
  range.addEventListener("input", hadleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveCilck);
}