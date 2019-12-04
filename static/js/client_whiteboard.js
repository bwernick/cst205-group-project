window.onload = function() {
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
    var eraser = document.getElementById("eraser");
    var brush = document.getElementById("brush");
    var brush_size_1 = document.getElementById("brush_size_1");
    var brush_size_2 = document.getElementById("brush_size_2");
    var brush_size_3 = document.getElementById("brush_size_3");
   	var colorToolbar = document.getElementById("colorToolbar");
 
    var line_width = 2;
    var stroke_style = "#000";
    var lastColor = "black";

    //TODO : Get this working
    // brush.onclick = function(){ stroke_style = "#ffee33"; };
    // eraser.onclick = function(){ stroke_style = "#fff"; };
    brush_size_1.onclick = function(){ ctx.lineWidth = 2; };
    brush_size_2.onclick = function(){ ctx.lineWidth = 4; };
    brush_size_3.onclick = function(){ ctx.lineWidth = 6; };
    // eraser.onclick = function(){
    // 	ctx.clearRect(0,0,myCanvas.width, myCanvas.height);
    // }

    // Fill Window Width and Height
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
	
	// Set Background Color
	ctx.fillStyle="#fff";
	
    // Mouse Event Handlers
	if(myCanvas){
		var isDown = false;
		var canvasX, canvasY;
		ctx.lineWidth = line_width;
		
		$(myCanvas)
		.mousedown(function(e){
			isDown = true;
			//ctx.beginPath();
			canvasX = e.pageX - myCanvas.offsetLeft;
			canvasY = e.pageY - myCanvas.offsetTop;
			ctx.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				//ctx.lineTo(canvasX, canvasY);
				var data = new Uint8ClampedArray();
				data = Uint8ClampedArray.from([0,0,0,255]);
				var imageData = new ImageData(data, 1, 1);
				ctx.putImageData(imageData, canvasX, canvasY); 
				//ctx.strokeStyle = stroke_style;
				//ctx.stroke();
			}
		})
		.mouseup(function(e){
			isDown = false;
			//ctx.closePath();
		});
	}
	
	// Touch Events Handlers
	draw = {
		started: false,
		start: function(evt) {

			ctx.beginPath();
			ctx.moveTo(
				evt.touches[0].pageX,
				evt.touches[0].pageY
			);

			this.started = true;

		},
		move: function(evt) {

			if (this.started) {
				ctx.lineTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);

				ctx.strokeStyle = stroke_style;
				ctx.lineWidth = line_width;
				ctx.stroke();
			}

		},
		end: function(evt) {
			this.started = false;
		}
	};

	function onColorClick(color) {
		ctx.closePath();
    	ctx.beginPath();
		stroke_style = color;

    	var borderColor = 'white';
    	if (color == 'white' || color == 'yellow') {
        borderColor = 'black';
    	}
    	$('#' + lastColor).css("border", "0px dashed white");
    	$('#' + color).css("border", "1px dashed " + borderColor);

    	lastColor = color;
    	
	}
	
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
		};
	}
	
	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);
	
	// Color toolabar click
	$('#colorToolbar div').click(function(evt) {
	console.log(evt) 
     onColorClick(evt.target.id)});

	$('#eraser').click(function(evt){
		ctx.clearRect(0,0, myCanvas.width, myCanvas.height)
	});

	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},false);
};