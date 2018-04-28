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

//This function creates and automatically downloads the CSV, 
//given an array paths of points.
function createCSV(paths,dataURL,text) {
  //var content = "data:text/csv;charset=utf-8,";
  var content = "";
  console.log("in the createCSV function");
  //console.log([paths]);
  //console.log(listyforpointsdata)

  var pathsJoin = '';
  paths.forEach(function(row, index){
    pathsJoin += "[" + row.toString()  + "],";
  });
  pathsJoin = pathsJoin.slice(0,-1);
  pathsJoin = "[[" + pathsJoin + "]]"
  console.log(pathsJoin);

  //check size of imagedata

  //var listyforpointsJoin = listyforpointsdata.join();
  //listyforpointsJoin = "[" + listyforpointsJoin + "]";
  //console.log(listyforpointsJoin)

  console.log(text);

  content = pathsJoin + "\n" + dataURL + "\n" + text;
  //console.log(content);

  //paths.forEach(function(point, index) {
  //  content += point.join(",") + "\n";
  //});

  //return encodeURI(content);
  var a         = document.createElement('a');
  //a.href        = 'data:attachment/csv,' +  encodeURI(content);
  a.href        = 'data:attachment/csv,' +  content;
  a.target      = '_blank';
  a.download    = text + ".txt";
  document.body.appendChild(a);
  a.click();
}


// Keep everything in anonymous function, called on window load.

if(window.addEventListener) {
window.addEventListener('load', function () {
  var canvas, context, canvaso, contexto;

  // The active tool instance.
  var tool_default = 'pencil';

  function init () {
    // Find the canvas element.
    canvaso = document.getElementById('imageView');
    if (!canvaso) {
      alert('Error: I cannot find the canvas element!');
      return;
    }

    if (!canvaso.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }

    // Get the 2D canvas context.
    contexto = canvaso.getContext('2d');
    if (!contexto) {
      alert('Error: failed to getContext!');
      return;
    }

    // Add the temporary canvas.
    var container = canvaso.parentNode;
    canvas = document.createElement('canvas');

    if (!canvas) {
      alert('Error: I cannot create a new canvas element!');
      return;
    }

    canvas.id     = 'imageTemp';
    canvas.width  = canvaso.width;
    canvas.height = canvaso.height;
    container.appendChild(canvas);
    

    context = canvas.getContext('2d');
   
	history.saveState(canvas);
    // Get the tool select input.
    tool = new tools["pencil"](canvas);

    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
    canvas.addEventListener('touchstart', ev_canvas, false);
    canvas.addEventListener('touchmove', ev_canvas, false);
    canvas.addEventListener('touchend',   ev_canvas, false);
  }

  // The general-purpose event handler. This function just determines the mouse 
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }
    
	

  // This function draws the #imageTemp canvas on top of #imageView, after which 
  // #imageTemp is cleared. This function is called each time when the user 
  // completes a drawing operation.
  function img_update () {
		contexto.drawImage(canvas, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // This object holds the implementation of each drawing tool.
  var tools = {};

 var history = {
    listyforpoints: [],
    counter: 0,
    saveState: function() {
      var imageshot = contexto.getImageData(0, 0, canvas.width, canvas.height);
      this.listyforpoints.push(imageshot);
      statetopath[this.counter] = storepaths;
      this.counter = this.counter + 1;
      statetopath[0]  = [];
      //alert(this.listyforpoints);
      },
    undo: function(){
    	if (this.listyforpoints.length > 1){
      		contexto.clearRect(0, 0, canvas.width, canvas.height);
      		var i;
      		for (i = 0; i < this.listyforpoints.length; i++) { 
    			contexto.putImageData(this.listyforpoints[i], 0, 0);
			}
			removepath = statetopath[this.counter-1][0];
			i = paths.toString().indexOf(removepath.toString());
			if (i == 0){
				paths = [];
			}
			else{
				paths2=paths.toString().slice(0, i-1);
				paths2 = paths2.split(",");
				paths = [];
				for (var i = 0; i < paths2.length-1; i+=2) {
					paths.push([paths2[i], paths2[i+1]]);
			}
			}
			this.listyforpoints.pop();
		};
    },
    clear:function(){
    	if (this.listyforpoints.length > 1){
      		this.listyforpoints.pop();
      		var last_element = this.listyforpoints[0];
      		contexto.clearRect(0, 0, canvas.width, canvas.height);
      		var img = new Image;
      		img.onload = function(){
  				contexto.drawImage(img,0,0);
			};
			img.src = last_element;
			this.listyforpoints = [];
			this.counter = 0;
			statetopath = {};
			storepaths = [];
			paths = [];
		};
    },
    savepath:function(){
    	var text =  document.getElementById('output2').value;
    	if (text == ""){
    		alert("What have you drawn? Type something in the textbox");
    	} else{
    	    var dataURL = canvaso.toDataURL();
    		createCSV(paths,dataURL,text);
    		document.getElementById('output2').value = "";
    	}
    	history.clear();
    },
    };
    

   $('#undo').bind('click', function() {
    history.undo();
  });
  
     $('#clear').bind('click', function() {
		var truefalse = prompt("Are you sure you want to clear your work? Cannot be undone.", "Yes/No");
		if (truefalse == "Yes"){
			history.clear();
			}
  });
        
     $('#save').bind('click', function() {
		history.savepath();
  });

  // The drawing pencil.
tools.pencil = function () {
    var tool = this;
    this.started = false;
    this.storepaths = []
	
    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
        tool.mousemove(ev);
    };
    
    this.touchstart = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
        tool.mousemove(ev);
    };

    // This function is called every time you move the mouse. Obviously, it only 
    // draws if the tool.started state is set to true (when you are holding down 
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
    	//var output = document.getElementById('output2');
        //output.innerHTML = mousePosition(ev);
        paths.push(mousePosition(ev));
        storepaths.push(mousePosition(ev));
        context.strokeStyle = color;
        context.stroke();
      }
    };
    
    this.touchmove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
    	//var output = document.getElementById('output2');
        //output.innerHTML = mousePosition(ev);
        paths.push(touchPosition(ev));
        storepaths.push(touchPosition(ev));
        context.strokeStyle = color;
        context.stroke();
      }
    };
        
	var mousePosition = function(ev) {
        var rect = canvas.getBoundingClientRect();
        return [(ev.clientX - rect.left) / canvas.offsetWidth,
            (ev.clientY - rect.top) / canvas.offsetHeight];
    };
    
    var touchPosition = function(ev) {
        var rect = canvas.getBoundingClientRect();
        var touch = ev.changedTouches[0];
        return [(touch.clientX - rect.left) / canvas.offsetWidth,
            (touch.clientY - rect.top) / canvas.offsetHeight];
    };
    
    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        history.saveState();
        storepaths = [];
        img_update();
      }
    };
    
    this.touchend = function (ev) {
      if (tool.started) {
        tool.touchmove(ev);
        tool.started = false;
        history.saveState();
        storepaths = [];
        img_update();
      }
    };
    
  };
  
	
  init();
  
  
}, false); }
