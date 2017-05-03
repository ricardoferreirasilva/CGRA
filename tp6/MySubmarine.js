/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);
    this.angle=0;
    this.x=0;
    this.z=0;
    this.r=1;
    this.triangle= new MyTriangle(scene);
    this.triangle.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MyTriangle;
MySubmarine.prototype.display = function() {
	//display do triangulo 
	this.scene.pushMatrix();
		this.scene.translate(this.x,0,this.z);
		this.scene.rotate(this.angle,0, 1, 0);
		this.triangle.display();
	this.scene.popMatrix();
 
};//rgb - xyz

MySubmarine.prototype.rotateLeft = function() {
	this.angle+=5* degToRad;

this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.rotateRight = function() {
	this.angle-=5* degToRad;
	
this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.translateForward = function() {
	this.z += (this.r*Math.cos(this.angle));
	this.x += (this.r*Math.sin(this.angle));
	
this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.translateBackwards= function() {
	
	
this.primitiveType = this.scene.gl.TRIANGLES;
};
