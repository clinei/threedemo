var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var PI2 = Math.PI * 2;

function Cycler(step, initial = 0.0, mult = PI2, func = Math.sin) {
	this.step = step;
	this.curr = initial;
	this.mult = mult;
	this.func = func;
	this.funcd = 0.0;
	
	this.update = function() {
		this.curr = (this.curr + this.step) % 1.0;
		this.funcd = this.func(this.curr * this.mult);
	};
}

function Cube(size) {
	this.geom = new THREE.BoxGeometry(size, size, size);
	
	for(var i = 0; i < this.geom.faces.length; i += 2) {
		var color = Math.random() * 0xffffff;
		this.geom.faces[i].color.setHex(color);
		this.geom.faces[i + 1].color.setHex(color);
	}
	
	this.mat = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
	this.mesh = new THREE.Mesh(this.geom, this.mat);
	this.cycler = new Cycler(0.006);
	
	this.update = function() {
		this.cycler.update();
		this.mesh.rotation.x += 0.0295 * Math.abs(this.cycler.funcd);
		this.mesh.rotation.z += 0.0295 * this.cycler.funcd;
	};
}

var cube = new Cube(1.0, 0xcc0000);
scene.add(cube.mesh);

var light = new THREE.PointLight(0xffffff, 1, 200);
scene.add(light);

camera.position.z = 1.2;
light.position.set(0, 0, 40);

function render() {
	requestAnimationFrame(render);
	
	cube.update();
	
	renderer.render(scene, camera);
}
render();

