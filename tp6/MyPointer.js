function MyPointer(scene, size) 
{
	CGFobject.call(this,scene);
	this.angle=0;
	this.size=size || 0.5;
	this.cylinder=new MyCylinder(this.scene,26,4);
	this.cylinder.initBuffers();

	
	 };

 MyPointer.prototype = Object.create(CGFobject.prototype);
 MyPointer.prototype.constructor = MyPointer;
 MyPointer.prototype.display = function() {
	this.scene.pushMatrix();
	this.scene.rotate((90 - this.angle) * (Math.PI / 180.0), 0, 0, 1);
	this.scene.rotate(Math.PI/4, 1,0,0);
	this.scene.rotate(Math.PI/2, 0,1,0);
	this.scene.scale(0.035,0.02,this.size);
	this.cylinder.display();
	this.scene.popMatrix();
 };

 MyPointer.prototype.setAngle = function(angle) 
{
	this.angle = angle;
};

 MyPointer.prototype.incAngle = function(angle) 
{
	this.angle += angle;
}