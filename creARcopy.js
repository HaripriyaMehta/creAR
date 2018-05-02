/* © 2009 ROBO Design
 * http://www.robodesign.ro
 */

var paths = [];
var storepaths = [];
var statetopath = {};
var color = "rgb(0, 0, 0)";
function selectColor(el){
    for(var i=0;i<document.getElementsByClassName("palette").length;i++){
        document.getElementsByClassName("palette")[i].style.borderColor = "#777";
        document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
    }
    el.style.borderColor = "#D2691E";
    el.style.borderStyle = "solid";
    color = window.getComputedStyle(el).backgroundColor;
}

 function setup() {
 	canvas = createCanvas(1250, 750);
 	canvas.parent("toolbar");
 	rect(0,0, 1249,749);
	strokeWeight(2);
	stroke(0);
}

function touchMoved() {
    drawingContext.strokeStyle = color;
	line(mouseX, mouseY, pmouseX, pmouseY);
	return false;
}

function rectangle() {
  stroke(255);
  fill(255,255,255,100);
  rect(70,70,60,60,10);
}
