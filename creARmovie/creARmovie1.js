var paths = [];
var statetopath = {0: []};
var prettycolor = "rgb(0, 0, 0)";
var canvas;
var mouses2 = [];
var currentCanv;
var globalbool = false;
var globaltwice = false;
var ptouchIsDown;
var pmouseIsPressed;
var listyforpoints = [];
var relatedObj;
var modeluse;
var counterformodel = 0;
var raw_data_model;
var undobool = false;

var historyforpts = {
    listyforpoints: [],
    counter: 1,
    saveState: function() {
		if (undobool == false && globaltwice == false) {
			var dataURL = document.getElementById("defaultCanvas0").toDataURL();
			listyforpoints.push(dataURL);
		}
		undobool = false;
      },
    undo: function(){
    	  listyforpoints.pop();
    	  globalbool = false;
    	  globaltwice = false;
    	  undobool = true;
    	  setup();
    	  newcan = listyforpoints[listyforpoints.length-1];
		  var image=new Image();
		  image.onload=function(){
			drawingContext.drawImage(image, 0, 0, 1000, 750);
		};
	image.src = newcan;
		},
	 clearly: function(){
	 	globalbool = false;
	 	globaltwice = false;
	 	setup();
	 	listyforpoints = [];
	 	
	 },
	 savepath: function(){
	 	 	document.getElementById("output").innerHTML = "recognizing bus";
	 		currentCanv  = document.getElementById("defaultCanvas0").toDataURL();
			globalbool = true;
			globaltwice = true;
			modeluse = dicty[listy[counterformodel]];
			console.log(counterformodel);
			raw_data_model = modeluse["model_raw_data"];
			setup();
			paths = [];
			counterformodel +=1;

// 		}
 	 },
	 startover: function(){
	 	paths = [];
	 },
    };

function downloadimage(){
	saveCanvas(document.getElementById("defaultCanvas0"), 'Canvas1', 'jpg');
}
    
function undo(){
    historyforpts.undo();
}

function cleary(){
		historyforpts.clearly();
}

function beginy(){
		historyforpts.savepath();
}

function startyd(){
		historyforpts.startover();
}
function selectColor(el){
    for(var i=0;i<document.getElementsByClassName("palette").length;i++){
        document.getElementsByClassName("palette")[i].style.borderColor = "#777";
        document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
    }
    el.style.borderColor = "#D2691E";
    el.style.borderStyle = "solid";
    prettycolor = window.getComputedStyle(el).backgroundColor;
}

 function setup() {
 	canvas = createCanvas(1000, 750);
 	canvas.parent("toolbar");
 	rect(0,0, 999,749);
	strokeWeight(2).strokeCap(ROUND);
	stroke(0);
	ptouchIsDown = touchIsDown;
  	pmouseIsPressed = mouseIsPressed;
	if (globalbool == true){
		  var image=new Image();
		  image.onload=function(){
			drawingContext.drawImage(image, 0, 0, 1000, 750);
		};
	image.src = currentCanv;
	}
	if (globaltwice == true){
		frameRate(30);
		var rnn_model_data = JSON.parse(raw_data_model);
		rnn_model = new SketchRNN(rnn_model_data);
	  encode_strokes();
	  // copies over the model
	  model_x = modeluse["x"];
	  model_y = modeluse["y"];
	  model_prev_pen = [0, 1, 0];

	}
}

function touchStarted() {
}

function touchMoved() {
	return false;
}
        
function touchEnded() {
	historyforpts.saveState();
    return false;
}

var strokes=[[-4,0,1,0,0]];
// sketch_rnn model
var rnn_model;
var rnn_model_data;
var temperature = 0.25;
var min_sequence_length = 5;

var model_pdf; // store all the parameters of a mixture-density distribution
var model_state;
var model_prev_pen;
var model_x, model_y;

// variables for the sketch input interface.
var start_x, start_y;
var end_x, end_y;

// UI
// dom
var model_sel;

var encode_strokes = function() {
  model_state = rnn_model.zero_state();
  // encode strokes
  model_state = rnn_model.update(rnn_model.zero_input(), model_state);
};
// 
var draw = function() {

if (globaltwice == false){
  if (ptouchIsDown && touchIsDown){
    drawingContext.strokeStyle = prettycolor;
	if (prettycolor == "rgb(0, 0, 0)"){
    	//alert("hello");
        strokeWeight(10).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(26, 26, 26)"){
        strokeWeight(9).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(51, 51, 51)"){
        strokeWeight(8).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(77, 77, 77)"){
        strokeWeight(7).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(102, 102, 102)"){
        strokeWeight(6).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(128, 128, 128)"){
        strokeWeight(5).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(153, 153, 153)"){
        strokeWeight(4).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(179, 179, 179)"){
        strokeWeight(3).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(204, 204, 204)"){
        strokeWeight(2).strokeCap(ROUND);
    }
    else {
        strokeWeight(20).strokeCap(ROUND);
    }
    paths.push([(touchX-8)/1000, (touchY-8)/750]);
    line(touchX, touchY, ptouchX, ptouchY);
  }
  if (pmouseIsPressed && mouseIsPressed){
    drawingContext.strokeStyle = prettycolor;
    mousey1 = mouseX;
	mousey2 = mouseY;
    paths.push([(mouseX-8)/1000, (mouseY-8)/750]);
    if (prettycolor == "rgb(0, 0, 0)"){
    	//alert("hello");
        strokeWeight(10).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(26, 26, 26)"){
        strokeWeight(9).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(51, 51, 51)"){
        strokeWeight(8).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(77, 77, 77)"){
        strokeWeight(7).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(102, 102, 102)"){
        strokeWeight(6).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(128, 128, 128)"){
        strokeWeight(5).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(153, 153, 153)"){
        strokeWeight(4).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(179, 179, 179)"){
        strokeWeight(3).strokeCap(ROUND);
    }
    else if (prettycolor == "rgb(204, 204, 204)"){
        strokeWeight(2).strokeCap(ROUND);
    }
    else {
        strokeWeight(20).strokeCap(ROUND);
    }
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  ptouchIsDown = touchIsDown;
  pmouseIsPressed = mouseIsPressed;
}

if (globaltwice == true){
  var model_dx, model_dy;
  var model_pen_down, model_pen_up, model_pen_end;
  model_pdf = rnn_model.get_pdf(model_state);
  [model_dx, model_dy, model_pen_down, model_pen_up, model_pen_end] = rnn_model.sample(model_pdf, temperature);

  if (model_pen_end === 1) {
    currentCanv = document.getElementById("defaultCanvas0").toDataURL();
    listyforpoints.push(currentCanv);
    globalbool = true;
    globaltwice = false;
    document.getElementById("output").innerHTML = "";
	setup();
  } else {

	var scale = modeluse["size"];
    if (model_prev_pen[0] === 1) {

      // draw line connecting prev point to current point.
      stroke("#CF3476");
      strokeWeight(3);
      line(model_x, model_y, model_x+scale*model_dx, model_y+scale*model_dy);
    }
    model_prev_pen = [model_pen_down, model_pen_up, model_pen_end];
    model_state = rnn_model.update([model_dx, model_dy, model_pen_down, model_pen_up, model_pen_end], model_state);

    model_x += scale*model_dx;
    model_y += scale*model_dy;
  }
}
};