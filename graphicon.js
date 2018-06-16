"use strict"

var Graphicon = function () {

	/**
	 * setup
	 *
	 * Sets up canvas and document for the game
	 *
	 * @param {object} canvas element
	 * @return {object}
	 *
	 */

	this.setup = (e) => {
		try {
			this.canvas = e;
			this.context = this.canvas.getContext('2d');
			this.screen = {
				width : window.innerWidth,
				height : window.innerHeight-4
			};

			document.querySelector('body').style.margin = "0px";
			document.querySelector('body').style.padding = "0px";
			this.canvas.height = this.screen.height;
			this.canvas.width = this.screen.width;

			return {
				canvas:this.canvas,
				context:this.context,
				width:this.screen.width,
				height:this.screen.height
			};
			
		}
		catch(e) {
			throw "LorelError: cannot create canvas."
		}
	}

	this.background = (r,g,b) => {
		this.context.rect(0,0,this.screen.width,this.screen.height);
		this.context.fillStyle = "rgb(" + r +"," + g + "," + b + ")";
		this.context.fill();
	}

	/**
	 * grid
	 *
	 * Grid line draws grids to a canvas.
	 *
	 * @param {int | float} distance between two consecutive grid lines.
	 * @param {float} takes the opacity value between 0.0 to 1.0.
	 *
	 * @return {null}
	 *
	 */

	this.grid = (scl,opc) => {
		for(var i=0; i<screen.width; i+=scl){
			this.context.beginPath();
			this.context.moveTo(i,0);
			this.context.lineTo(i,this.screen.height);
			this.context.strokeStyle = "rgba(0,0,0,"+opc+")";
			this.context.stroke();
			this.context.closePath();
		}
		for(var i=0; i<screen.height; i+=scl){
			this.context.beginPath();
			this.context.moveTo(0,i);
			this.context.lineTo(this.screen.width,i);
			this.context.strokeStyle = "rgba(0,0,0,"+opc+")";
			this.context.stroke();
			this.context.closePath();
		}
	}


	var Utility = function() {
		/**
		 * randomIntFromRange
		 *
		 * Gives a random number
		 *
		 * @param {int} min bullet's x and y position.
		 * @param {int} max radius of enemy.
		 *
		 * @return {int}
		 *
		 */

		this.randomIntFromRange = function(min, max) {
		    return Math.floor(Math.random() * (max - min + 1) + min);
		}


		/**
		 * distance
		 *
		 * Gives distance between two points
		 *
		 * @param {int | float} x1 x coordinate of point 1.
		 * @param {int | float} y1 y coordinate of point 1.
		 * @param {int | float} x2 x coordinate of point 2.
		 * @param {int | float} x2 x coordinate of point 2.
		 *
		 * @return {int | float}
		 *
		 */

		this.distance = function(x1, y1, x2, y2) {
		    var xDist = x2 - x1;
		    var yDist = y2 - y1;

		    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
		}


		/**
		 * mouse 
		 *
		 * returns coordinates of the mouse
		 *
		 * @return {object}
		 */	

		this.mouse = {x: 0,	y: 0};

		document.querySelector('canvas').addEventListener('mousemove',(e) => {
			this.mouse.x = e.clientX;
			this.mouse.y = e.clientY;
		});

		this.touch = {x: undefined,	y: undefined};

		document.querySelector('canvas').addEventListener('touchmove',(e) => {
			this.touch.x = e.touches[0].clientX;
			this.touch.y = e.touches[0].clientY;
		});
	}
	this.utility = new Utility();

}

// Creating a graphic object so for static usage

const g = new Graphicon();


/**
 * Vector
 *
 * creates a 2D vector object
 *
 */

function createVector(x,y) {
	var insta = new Vector();
	if(typeof x == "number" && typeof y == "number") {
		insta.set({x:x,y:y});
		return insta;
	}
	else {
		throw "LorelError: createVector method only takes numbers as arguments";
	}
}

function createRandom2D(min,max) {
	var insta = new Vector();
	if(typeof min == "number" && typeof max == "number") {
		var x = g.utility.randomIntFromRange(min,max);
		var y = g.utility.randomIntFromRange(min,max);

		insta.set({x:x,y:y});
		return insta;
	}
	else {
		throw "LorelError: createRandom2D method only takes numbers as arguments";
	}
}

var Vector = function() {

	this.x = undefined;
	this.y = undefined;

	this.set = (val) => {
		if(typeof val.x == "number" && typeof val.y == "number") {
			this.x = val.x;
			this.y = val.y;
		}
		else {
			throw "LorelError: set method only takes object as arguments";
		}
	};

	// copy function returns JSON with the x and y coordinate of the vector
	this.copy = () => {
		return {x:this.x,y:this.y};
	};


	// all vector math functions
	this.math = {
		add: (vector) => {	
			if(vector.constructor.name == "Vector") {
				this.x += vector.x;
				this.y += vector.y;
				return true;
			}
			else {
				if(typeof vector == "number") {
					this.x += vector;
					this.y += vector;
				}
				else {
					throw "LorelError: vector add method can only take a vector object or a single value.";
					return false;
				}
			}
		},

		sub: (vector) => {
			if(vector.constructor.name == "Vector") {
				this.x -= vector.x;
				this.y -= vector.y;
				return true;
			}
			else {
				if(typeof vector == "number") {
					this.x -= vector;
					this.y -= vector;
				}
				else {
					throw "LorelError: vector sub method can only take a vector object or a single value.";
					return false;
				}
			}
		},

		mult: (vector) => {	
			if(vector.constructor.name == "Vector") {
				this.x *= vector.x;
				this.y *= vector.y;
				return true;
			}
			else {
				if(typeof vector == "number") {
					this.x *= vector;
					this.y *= vector;
				}
				else {
					throw "LorelError: vector mult method can only take a vector object or a single value.";
					return false;
				}
			}
		},

		div: (vector) => {	
			if(vector.constructor.name == "Vector") {
				this.x /= vector.x;
				this.y /= vector.y;
				return true;
			}
			else {
				if(typeof vector == "number") {
					this.x /= vector;
					this.y /= vector;
				}
				else {
					throw "LorelError: vector div method can only take a vector object or a single value.";
					return false;
				}
			}
		},

		dist: (vector) => {
			if(vector.constructor.name == "Vector") {
				return Math.sqrt(Math.pow(g.utility.distance(this.x,this.y,vector.x,vector.y), 2));
			}
			else {
				throw "LorelError: vector dist method can only take a vector object.";
				return false;
			}
		},

		mag: () => {
			try {
				return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
			}
			catch(e) {
				throw e;
			}
		},

		normalize: () => {
			try {
				var mag = this.math.mag();
				this.set({x:this.x/mag,y:this.y/mag});
				return true;
			}
			catch(e) {
				throw e;
				return false;
			}
		},

		fix: (e) => {
			if(typeof e == "number") {
				this.x.toFixed(e);
				this.y.toFixed(e);
			}
			else {
				throw "LorelError: vector fix method can only take a number as argument.";
			}
		}
	};

}


// the animation loop

// function init() {
// 	setup();
// 	animate();
// }

// function animate() {
// 	requestAnimationFrame(animate);
// 	draw();
// }
// init();