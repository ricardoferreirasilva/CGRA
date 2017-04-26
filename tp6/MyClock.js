function MyClock(scene, slices,stacks) {
 	CGFobject.call(this,scene);
	this.cylinder=new MyCylinder(scene,slices,stacks);
	this.cylinder.initBuffers();
 	this.tampo=new MyCircle(scene,slices);
 	this.tampo.initBuffers();

 	this.hourPointer=new MyPointer(scene, 0.1);
 	this.hourPointer.initBuffers();
 	
 	this.minutePointer=new MyPointer(scene,0.2);
 	this.minutePointer.initBuffers();
 	
 	this.secondPointer=new MyPointer(scene, 0.25);
 	this.secondPointer.initBuffers();
 	
 	this.clockTexture = new CGFappearance(this.scene);
	this.clockTexture.setAmbient(1,1,1,1);
	this.clockTexture.setDiffuse(255/255,255/255,255/255,1.0);
	this.clockTexture.setSpecular(1,1,1,1);
	this.clockTexture.loadTexture("./clock.png");

 	this.lastUpd=0;
 	this.updInt=1000;

 	this.incS=360/60;
	this.incM=this.incS/60;
	this.incH=this.incM/12;

 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
	this.scene.pushMatrix();
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.clockTexture.apply();
	this.tampo.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.secondPointer.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.minutePointer.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.hourPointer.display();
	this.scene.popMatrix();
 };

MyClock.prototype.update = function(currTime) 
{

  var secP=Math.round(currTime/1000)%60;
 	var minP=Math.round(currTime/1000/60)%60;
 	var hrP=Math.round(currTime/1000/60/60)%12;
 	
 	this.secondPointer.setAngle(secP*this.incS);
 	this.minutePointer.setAngle(minP*this.incS + secP*this.incM);
 	this.hourPointer.setAngle(hrP*(360/12)+minP*this.incM+secP*this.incH);
}