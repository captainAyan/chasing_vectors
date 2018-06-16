
const setup = g.setup(document.querySelector('canvas'));
const width = setup.width;
const height = setup.height;
const canvas = setup.canvas;
const c = setup.context;

var point;
var enemys = [];

function init() {
	point = new Point(width/2,height/2);	
	for(var i=0; i<2; i++) {
		enemys.push(new Enemy(g.utility.randomIntFromRange(0,width),g.utility.randomIntFromRange(0,height)))
	}
	animate();
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    g.background(0,0,0);
    point.update();

    enemys.forEach((enemy) => {
        enemy.update();

        enemys.forEach((e) => {
        	if(enemy != e) {
        		var dis = enemy.position.math.dist(e.position)-40;
        		if(dis < 0) {}
        	}
        });
    });
}

init();