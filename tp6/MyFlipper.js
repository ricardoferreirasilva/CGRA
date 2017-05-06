/**
 * MyFlipper
 * @constructor
 */
function MyFlipper(scene) {
    CGFobject.call(this, scene);
    this.triangle= new MyTriangle2(scene);
    this.quad= new MyQuad(scene,0,1,0,1);
    this.triangle.initBuffers();
};

MyFlipper.prototype = Object.create(CGFobject.prototype);
MyFlipper.prototype.constructor = MyTriangle2;
MyFlipper.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.scale(0.30,1,0.35);
		this.triangle.display();
		this.scene.translate(0,0.1,0);
		this.triangle.display();
	this.scene.popMatrix();
		
	this.scene.pushMatrix();
		this.scene.rotate(90 * degToRad,1, 0, 0);
		this.scene.rotate(-90 * degToRad,0, 1, 0);
		this.scene.scale(0.1,0.35,1);
		this.scene.translate(-0.5,0.5,0)
		this.quad.display();
		
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad,1, 0, 0);
			this.scene.rotate(-73.5 * degToRad,1, 0, 0);
			this.scene.translate(0,0,0.15);
			this.quad.display();
		this.scene.popMatrix();
	
	this.scene.popMatrix();
};	