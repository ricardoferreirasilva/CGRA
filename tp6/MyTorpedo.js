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
	this.benzierCalculated = false;
    this.p1;
	this.p2;
	this.p3;
	this.p4;
	this.benzierT;
	this.benzierDistance;
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
MyTorpedo.prototype.calculateBenzierPoints = function(tX,tY,tZ){
	if(!this.benzierCalculated)
	{
		this.p1 = {x: this.x,y:this.y,z:this.z};
		this.p2 = { x: this.x+6*Math.cos(this.ver_angle)*Math.sin(this.hor_angle) , y: this.y-6*Math.sin (this.ver_angle), z: this.z+6*Math.cos(this.ver_angle)*Math.cos(this.hor_angle)};
		this.p3 = {x: tX,y:tY+3,z:tZ};
		this.p4 = {x: tX,y:tY,z:tZ};
		this.benzierT = 0;
		this.benzierDistance = Math.sqrt( Math.pow((tX-this.x),2) + Math.pow((tY-this.y),2) + Math.pow((tZ-this.z),2));
		console.log("Distance: " + this.benzierDistance);
		this.benzierCalculated = true;
	}
	
}
MyTorpedo.prototype.update = function(currTime){
	this.lastime = this.lastime || currTime;
 	var dt = currTime - this.lastime;
	this.lastime = currTime;
	if(this.hasLaunched && this.benzierCalculated)
	{
		console.log("TIME: "+this.lastime);
		//this.benzierT +=  1/(1000/dt * this.benzierDistance);
		this.benzierT += 0.002
		//console.log(this.benzierT);
		//this.z += ((Math.sin(90) * 5*dt/1000) - (Math.sin(90) * subSpeed*dt/1000));
		//this.x += Math.cos(this.ver_angle) * (2*dt/1000);
		//this.z += Math.sin(this.ver_angle) * (2*dt/1000);
		//this.y -= Math.sin(this.hor_angle) * (2 *dt/ 1000);

		if(this.benzierT < 1)
		{
			var newX = (this.p1.x * Math.pow((1-this.benzierT),3)) + (this.p2.x* 3*this.benzierT*Math.pow((1-this.benzierT),2) + (this.p3.x * 3 * Math.pow(this.benzierT,2)*(1-this.benzierT))+(this.p4.x * Math.pow(this.benzierT,3)));
			var newY = (this.p1.y * Math.pow((1-this.benzierT),3)) + (this.p2.y* 3*this.benzierT*Math.pow((1-this.benzierT),2) + (this.p3.y * 3 * Math.pow(this.benzierT,2)*(1-this.benzierT))+(this.p4.y * Math.pow(this.benzierT,3)));
			var newZ = (this.p1.z * Math.pow((1-this.benzierT),3)) + (this.p2.z* 3*this.benzierT*Math.pow((1-this.benzierT),2) + (this.p3.z * 3 * Math.pow(this.benzierT,2)*(1-this.benzierT))+(this.p4.z * Math.pow(this.benzierT,3)));
			console.log(newX + " " + newY + " " + newZ);
				this.x = newX;
				this.y = newX;
				this.z = newX;
		}
	}

}