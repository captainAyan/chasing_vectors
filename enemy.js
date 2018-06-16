function Enemy(x,y) {
	this.position = createVector(x,y);

	this.velocity = createRandom2D(1,20);

	this.mass = 5;

	this.update = function() {
		var x = point.position.x - this.position.x;
		var y = point.position.y - this.position.y;

		this.velocity.set({x:x,y:y});

		this.velocity.math.normalize();

		this.velocity.math.mult(1);

		this.position.math.add(this.velocity);
		this.position.math.fix(0);

		this.draw();
	};

	this.draw = function() {
		// direction line

		var scl = 10;
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
		c.strokeStyle = "#f00";
		c.stroke();
		c.fillStyle = "rgba(255,0,0,0.2)";
		c.fill();
		c.closePath();
	}
}