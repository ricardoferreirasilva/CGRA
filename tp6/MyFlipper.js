/**
 * MyFlipper
 * @constructor
 */
function MyFlipper(scene) {
    CGFobject.call(this, scene);
    this.triangle= new MyTriangle2(scene);
    this.quad= new MyQuad(scene,0,1,0,1);
    this.cube= new MyUnitCubeQuad(scene);
    this.triangle.initBuffers();
};

MyFlipper.prototype = Object.create(CGFobject.prototype);
MyFlipper.prototype.constructor = MyTriangle2;
MyFlipper.prototype.display = function() {
	this.scene.translate(2,0,2);
	
	this.scene.pushMatrix();
		this.scene.scale(0.30,0.1,0.35);
		this.scene.pushMatrix();
			this.triangle.display();
			this.scene.translate(0,1,0);
			this.triangle.display();
		this.scene.popMatrix();
		this.scene.rotate(90 * degToRad,1, 0, 0);
		this.scene.rotate(-90 * degToRad,0, 1, 0);
		this.scene.translate(-0.5,0.5,0)
		this.quad.display();
		this.scene.pushMatrix();
			this.scene.translate(0,0,-0.5);
			this.scene.rotate(-135 * degToRad,1, 0, 0);
			this.scene.scale(1,Math.sqrt(2),1);
			this.quad.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0,0.1,-1.64);
		this.scene.rotate(180 * degToRad,1, 0, 0);
		this.scene.scale(0.30,0.1,0.35);
		this.scene.pushMatrix();
			this.triangle.display();
			this.scene.translate(0,1,0);
			this.triangle.display();
		this.scene.popMatrix();
		this.scene.rotate(90 * degToRad,1, 0, 0);
		this.scene.rotate(-90 * degToRad,0, 1, 0);
		this.scene.translate(-0.5,0.5,0)
		this.quad.display();
		this.scene.pushMatrix();
			this.scene.translate(0,0,-0.5);
			this.scene.rotate(-135 * degToRad,1, 0, 0);
			this.scene.scale(1,Math.sqrt(2),1);
			this.quad.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.15,0.05,-0.82);
		this.scene.scale(0.3,0.1,1.64);
		this.cube.display();
	this.scene.popMatrix();
};	