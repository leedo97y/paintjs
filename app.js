const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // -> Context can control pixel's in canvas
const colors = document.getElementsByClassName("jsColor");

// => when you want to use Canvas, you need css-size and js-size both !! 
canvas.width  =700;
canvas.height = 700;

// [ Make Canvas Default Style ]
ctx.strokeStyle = "#2C2C2C"; // color of line
ctx.lineWidth = 2.5; // line's width


let painting = false;

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
}



if (canvas) {
  canvas.addEventListener("mousemove",  onMouseMove); // detecting Mouse-Movement EventCode
  canvas.addEventListener("mousedown", startPainting); // click EventCode
  canvas.addEventListener("mouseup", stopPainting); // un-click EventCode
  canvas.addEventListener("mouseleave", stopPainting) // mouse is in outside of canvas
}

// [ Creating Array ]
// Colors - in Color add Event = by click, function name : handleColorClick
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
