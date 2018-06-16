function Point(x,y) {
	this.position = createVector(x,y);

	this.velocity = createRandom2D(1,20);

	this.acc = 0.00;
	this.speed = 2;

	this.update = function() {

		var x,y;

		if(g.utility.touch.x != undefined && g.utility.touch.y != undefined) {
			x = g.utility.touch.x - this.position.x;
			y = g.utility.touch.y - this.position.y;
		}
		else {
			x = g.utility.mouse.x - this.position.x;
			y = g.utility.mouse.y - this.position.y;
		}
		
		// x = g.utility.mouse.x - this.position.x;
		// y = g.utility.mouse.y - this.position.y;

		this.velocity.set({x:x,y:y});

		this.velocity.math.normalize();
		this.speed += this.acc;

		// the next line of code makes the object move by adding the velocity to it's position

		this.position.x += this.velocity.x * this.speed;
		this.position.y += this.velocity.y * this.speed;


		// this.position.math.add(this.velocity);


		this.position.math.fix(0);
		this.draw();
	};

	this.draw = function() {

		// direction line

		var scl = 15;
		var x = this.position.x + (this.velocity.x * scl);
		var y = this.position.y + (this.velocity.y * scl);

		function coor_finder(scl,r,x,y,position) {
			var _t = r/scl;

			var m1 = (position.y - y)/(position.x - x);
			
			var x3 = (((1 + (m1 * _t))/(m1 - _t)) * ((position.x/m1) + position.y - y) + x) / (1 + ((1 + (m1 * _t)) / (Math.pow(m1,2) - m1 * _t)));
			var y3 = ((position.x - x3) / m1) + position.y;

			return {
				x : x3,
				y : y3
			};
		}

		var point1 = coor_finder(scl, (scl/2), x, y, this.position);
		var point2 = coor_finder(scl, (-(scl/2)), x, y, this.position);

		c.beginPath();
		c.moveTo(x,y);
		c.lineTo(point1.x, point1.y);
		c.lineTo(point2.x, point2.y);
		c.lineTo(x,y);
		c.strokeStyle = "#fff";
		c.stroke();
		c.fillStyle = "rgba(255,255,255,0.2)";
		c.fill();
		c.closePath();

	}
}