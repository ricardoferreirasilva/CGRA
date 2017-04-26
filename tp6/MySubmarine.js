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
    this.triangle= new MyTriangle(scene);
    this.triangle.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MyTriangle;
MySubmarine.prototype.display = function() {
	//display do triangulo 
	this.scene.pushMatrix();
		this.scene.rotate(this.angle,0, 1, 0);
		this.scene.translate(this.x,0,this.z);
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
	this.z += Math.cos(this.angle);
	this.x += Math.sin(this.angle);
	
this.primitiveType = this.scene.gl.TRIANGLES;
};

MySubmarine.prototype.translateBackwards= function() {
	this.angle-=5* degToRad;
	
this.primitiveType = this.scene.gl.TRIANGLES;
};
