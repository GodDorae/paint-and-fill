const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const paintOrFill = document.getElementById("paint-or-fill");
const erase = document.getElementById("erase");
const clear = document.getElementById("clear");
const file = document.getElementById("file");
const text = document.getElementById("text");
const save = document.getElementById("save");

canvas.width = 800;
canvas.height = 800;

context.lineWidth = 5;
context.lineCap = "round";

// Beautiful Lines
// const colors = [
//   "#c56cf0",
//   "#ffb8b8",
//   "#ff3838",
//   "#ff9f1a",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5",
//   "#18dcff",
//   "#7d5fff",
//   "#4b4b4b",
// ];

// function clickHandler(event) {
//   context.beginPath();
//   context.moveTo(0,0);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   context.strokeStyle = color;
//   context.lineTo(event.offsetX, event.offsetY);
//   context.stroke();
// }

// canvas.addEventListener("mousemove", clickHandler);

let isPainting = false;
let defaultOption = "Paint";
paintOrFill.innerText = defaultOption;
let isErasing = false;
let isClicked = false;

function onMove(event) {
  if (isPainting && defaultOption === "Paint") {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }
  if (isErasing && isClicked) {
    context.beginPath();
    context.clearRect(event.offsetX, event.offsetY, 10, 10);
  }

  context.moveTo(event.offsetX, event.offsetY);
}

function startDoing() {
  isPainting = true;
  isClicked = true;

  if (defaultOption === "Fill") {
    canvas.style.backgroundColor = `${color.value}`;
  }

  if (isErasing) {
    isPainting = false;
  }
}

function cancelDoing() {
  isPainting = false;
  isClicked = false;
}

function lineWidthHandler(event) {
  context.beginPath();
  context.lineWidth = event.target.value;
}

function colorChangeHandler(event) {
  context.beginPath();
  context.strokeStyle = `${event.target.value}`;
}

function paintOrFillHandler() {
  if (defaultOption === "Paint") {
    defaultOption = "Fill";
    paintOrFill.innerText = defaultOption;
  } else {
    defaultOption = "Paint";
    paintOrFill.innerText = defaultOption;
  }
}

function eraseHandler() {
  if (isErasing === false) {
    isErasing = true;
    erase.style.backgroundColor = "gray";
  } else {
    isErasing = false;
    erase.style.backgroundColor = "white";
  }
}

function clearHandler() {
  canvas.style.backgroundColor = "white";
  context.beginPath();
  context.clearRect(0, 0, 800, 800);
}

function fileChangeHandler(event) {
  const fileForUrl = event.target.files[0];
  const url = URL.createObjectURL(fileForUrl);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    context.drawImage(image, 0, 0, 800, 800);
    file.value = null;
  };
}

function textWritingHandler(event) {
  const writenText = text.value;
  if (writenText !== "") {
    context.save();
    context.lineWidth = 1;
    context.font = "48px sans-serif";
    context.fillText(writenText, event.offsetX, event.offsetY);
    context.restore();
  }
}

function fileSaveHandler() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startDoing);
canvas.addEventListener("mouseup", cancelDoing);
canvas.addEventListener("mouseleave", cancelDoing);
canvas.addEventListener("dblclick", textWritingHandler);

lineWidth.addEventListener("change", lineWidthHandler);

color.addEventListener("change", colorChangeHandler);

paintOrFill.addEventListener("click", paintOrFillHandler);

erase.addEventListener("click", eraseHandler);

clear.addEventListener("click", clearHandler);

file.addEventListener("change", fileChangeHandler);

save.addEventListener("click", fileSaveHandler);