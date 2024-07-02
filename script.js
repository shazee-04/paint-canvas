var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function onLoad() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasbg();
    // document.getElementById("brush").style.transform = "scale(1.3)";
    // scaleTool = scaleTool.style.transform = "scale(1.3)";
}

var isPainting = false;

function canvasOnMouseDown(e) {
    startPainting(e);
}

function canvasOnMouseMove(e) {
    painting(e);
}

function canvasOnMouseUp() {
    isPainting = false;
}

var mouseMemoryX;
var mouseMemoryY;
var screenMemory;

function startPainting(e) {
    isPainting = true;
    mouseMemoryX = e.offsetX;
    mouseMemoryY = e.offsetY;
    context.beginPath();
    // context.strokeStyle = "black";
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.lineJoin = "round";

    screenMemory = context.getImageData(0, 0, canvas.width, canvas.height);
}

function painting(e) {
    if (isPainting == true) {

        context.putImageData(screenMemory, 0, 0);

        context.strokeStyle = selectedColor2;
        context.fillStyle = selectedColor;

        if (selectedDrawingTool == 'brush') {
            if (checkbox2.checked) {
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
            }
        }
        else if (selectedDrawingTool == 'rectangle') {
            drawRectangle(e);
        }
        else if (selectedDrawingTool == 'triangle') {
            drawTriangle(e);
        }
        else if (selectedDrawingTool == 'circle') {
            drawCircle(e);
        }
        else if (selectedDrawingTool == 'eraser') {
            context.strokeStyle = "white";
            context.lineWidth = brushSize;
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
        }

    } else {
        return;
    }
}

var checkbox = document.getElementById("fill-checkbox");
var checkbox2 = document.getElementById("fill-checkbox2");

function drawCircle(e) {
    context.beginPath();
    var dx = mouseMemoryX - e.offsetX;
    var dy = mouseMemoryY - e.offsetY;
    var radius = Math.sqrt(dx * dx + dy * dy);
    context.arc(mouseMemoryX, mouseMemoryY, radius, 0, 2 * Math.PI);
    if (checkbox.checked) {
        context.fill();
    }
    if (checkbox2.checked) {
        context.stroke();
    }
}

// function drawCircle(e) {
//     context.beginPath();
//     context.arc(mouseMemoryX, mouseMemoryY, e.offsetX-mouseMemoryX , 0, 2 * Math.PI);
//     context.stroke();
// }

function drawTriangle(e) {
    context.beginPath();
    context.moveTo(mouseMemoryX, mouseMemoryY);
    context.lineTo(e.offsetX, e.offsetY);
    context.lineTo(mouseMemoryX * 2 - e.offsetX, e.offsetY);
    context.closePath();
    if (checkbox.checked) {
        context.fill();
    }
    if (checkbox2.checked) {
        context.stroke();
    }
}

var checkbox = document.getElementById("fill-checkbox");

function drawRectangle(e) {
    if (checkbox.checked) {
        context.fillRect(e.offsetX, e.offsetY, mouseMemoryX - e.offsetX, mouseMemoryY - e.offsetY);
    }
    if (checkbox2.checked) {
        context.strokeRect(e.offsetX, e.offsetY, mouseMemoryX - e.offsetX, mouseMemoryY - e.offsetY);
    }
}

var selectedColor = "black";
var selectedColor2 = "red";

function changeColor() {
    var colorPicker = document.getElementById("color-picker");
    var colorPicker2 = document.getElementById("color-picker2");
    selectedColor = colorPicker.value;
    selectedColor2 = colorPicker2.value;
}

var brushSize = 5;

function changeBrushSize() {
    opct = 100;
    var sizeSlider = document.getElementById("size-slider");
    brushSize = sizeSlider.value;
    if (opctworker == 0) {
        rangeSize();
    }
}

var count = 0;
var opct = 100;
var opctworker = 0;

function rangeSize() {
    opctworker = setInterval(() => {
        document.getElementById("rangeSize").innerHTML = brushSize;
        document.getElementById("rangeSize").style.opacity = 100 + "%";
        count = count + 1;
        if (count > 50) {
            document.getElementById("rangeSize").style.opacity = 0 + "%";
            clearInterval(opctworker);
            opctworker = 0;
            count = 0;
        }
    }, 15);
}

var selectedDrawingTool = "eraser";

function changeTool(tool) {
    document.getElementById(tool).style.transform = "scale(1.2)";
    document.getElementById(selectedDrawingTool).style.transform = "";
    selectedDrawingTool = tool;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasbg();
}

var saveCount = 0;

function save() {
    saveCount = saveCount + 1;
    var dataLink = document.createElement("a");
    dataLink.download = Date.now() + "(" + saveCount + ")" + ".jpg";
    dataLink.href = canvas.toDataURL();
    dataLink.click();
}

function setCanvasbg() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = selectedColor;
}
