/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene,x,y,z, hor_angle, ver_angle) {
    CGFobject.call(this, scene);
    this.x=x;
    this.z=z;
    this.y=y;
    this.ver_angle=ver_angle;
    this.hor_angle=hor_angle;
    
    this.triangle= new MyTriangle(scene);
    this.hemisphere= new MyHemiSphere(scene,20,8);
    this.cylinder= new MyCylinder(scene,20,1);
    this.flipper= new MyFlipper(scene);
    
    this.triangle.initBuffers();

	this.hasLaunched = false;
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTriangle;
MyTorpedo.prototype.display = function() {
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
	
	//Torpedo Display
	//Back Hemisphere
	this.scene.pushMatrix();
		this.scene.translate(2.04,-0.7,0);
		this.scene.scale(0.25,0.25,0.25);	
		this.scene.pushMatrix();
			this.scene.scale(0.5*0.92,0.5*0.92,0.5*0.92);
			this.scene.rotate(-90 * degToRad,0, 1, 0);
			this.hemisphere.display();
		this.scene.popMatrix();	
		//Cylinder (Body)
		
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad,0, 1, 0);
			this.scene.scale(0.5*0.92,0.5*0.92,4.08);
			this.cylinder.display();
		this.scene.popMatrix();
		//front Hemisphere
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad,0, 1, 0);
			this.scene.scale(0.5*0.92,0.5*0.92,0.5*0.92);
			this.scene.translate(0,0,8.85);
			this.hemisphere.display();
		this.scene.popMatrix();	
		this.scene.translate(0.15,0,0);
		this.scene.rotate(180 * degToRad,1, 0, 0);
		//BackFlippers
		this.scene.scale(0.75,0.75,0.75);
		this.scene.pushMatrix();
	 		this.flipper.display();
	 	this.scene.popMatrix();
	 		
	 	this.scene.pushMatrix();
	 		this.scene.rotate(90 * degToRad,1,0, 0);
	 		this.flipper.display();
	 	this.scene.popMatrix();
 	this.scene.popMatrix();
	this.scene.translate(this.x,this.y,this.z);
	this.scene.rotate(this.ver_angle,0, 1, 0);
	this.scene.rotate(this.hor_angle,1, 0, 0);
	
};
MyTorpedo.prototype.launch = function(){
	this.hasLaunched = true;
	
}
MyTorpedo.prototype.update = function(currTime){
	this.lastime = this.lastime || currTime;
 	var dt = currTime - this.lastime;
	this.lastime = currTime;
	if(this.hasLaunched)
	{
		//Sub position
		var subX = this.scene.submarine.x;
		var subY = this.scene.submarine.y;
		var subZ = this.scene.submarine.z;
		var subSpeed = this.scene.submarine.speed;
		//What we want to increment
		//var zIncrement = (Math.sin(90) * 1*dt/1000);

		//this.z += (Math.sin(90) * 1*dt/1000);

		//Real position of the torpedo
		var realX = subX + this.x;
		var realY = subY + this.y
		var realZ = subZ + this.z;
		//console.log("TOR: "+realX+" "+realY + " "+realZ);

		this.z += ((Math.sin(90) * 5*dt/1000) - (Math.sin(90) * subSpeed*dt/1000));
	}

}