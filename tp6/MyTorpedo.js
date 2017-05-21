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
    this.exploded = false;
    this.startx=x;
    this.starty=y;
    this.startz=z;
    
    this.ver_angle=ver_angle;
    this.hor_angle=hor_angle;
    
    this.hor_bezier = hor_angle-Math.PI;
	this.ver_bezier = ver_angle;
	this.deltadis = {x : 0, y : 0 , z : 0 };
	
	this.benzierCalculated = false;
	
    this.p1;
	this.p2;
	this.p3;
	this.p4;
	this.target;
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
	
};
MyTorpedo.prototype.launch = function(){
	this.hasLaunched = true;
	
}
MyTorpedo.prototype.calculateBenzierPoints = function(tX,tY,tZ,target){
	if(!this.benzierCalculated)
	{
		console.log("T "+tX+" "+tY+" "+tZ);
		this.p1 = {x: this.startx,y:this.starty,z:this.startz};
		this.p2 = { x: this.startx+6*Math.cos(this.ver_angle)*Math.sin(this.hor_angle) , y: this.starty-6*Math.sin (this.ver_angle), z: this.startz+6*Math.cos(this.ver_angle)*Math.cos(this.hor_angle)};
		this.p3 = {x: tX,y:tY+3,z:tZ};
		this.p4 = {x: tX,y:tY,z:tZ};
		this.benzierT = 0;
		this.benzierDistance = Math.sqrt( Math.pow((tX-this.x),2) + Math.pow((tY-this.y),2) + Math.pow((tZ-this.z),2));
		console.log("Distance: " + this.benzierDistance);
		this.benzierCalculated = true;
		this.target = target;
	}
	
}
MyTorpedo.prototype.update = function(currTime){
	this.lastime = this.lastime || currTime;
 	var dt = currTime - this.lastime;
	this.lastime = currTime;
	if(this.hasLaunched && this.benzierCalculated)
	{
		//console.log("TIME: "+this.lastime);
		//this.benzierT +=  1/(1000/dt * this.benzierDistance);
		this.benzierT += 0.005;

		var newX = (Math.pow((1-this.benzierT),3)*this.p1.x) + (3*Math.pow((1-this.benzierT),2)*this.benzierT*this.p2.x) + (3*(1-this.benzierT)*Math.pow(this.benzierT,2)*this.p3.x) + (Math.pow(this.benzierT,3)*this.p3.x);
		var newY = (Math.pow((1-this.benzierT),3)*this.p1.y) + (3*Math.pow((1-this.benzierT),2)*this.benzierT*this.p2.y) + (3*(1-this.benzierT)*Math.pow(this.benzierT,2)*this.p3.y) + (Math.pow(this.benzierT,3)*this.p3.y);
		var newZ = (Math.pow((1-this.benzierT),3)*this.p1.z) + (3*Math.pow((1-this.benzierT),2)*this.benzierT*this.p2.z) + (3*(1-this.benzierT)*Math.pow(this.benzierT,2)*this.p3.x) + (Math.pow(this.benzierT,3)*this.p3.z);

		this.deltadis = {x : (this.x-newX), y: (this.y-newY), z: (this.z-newZ)};
		
		this.hor_bezier = Math.atan2(this.deltadis.x, this.deltadis.z);
		this.ver_bezier = Math.atan2(Math.abs(this.deltadis.y), Math.abs(this.deltadis.z));
		
		if(this.benzierT == 0)
		{
				this.x = this.p1.x;
				this.y = this.p1.y;
				this.z = this.p1.z;
		}
		else if(this.benzierT < 1)
		{
				//console.log(newX + " " + newY + " " + newZ);
				this.x = newX;
				this.y = newX;
				this.z = newX;
		}
		else if(this.benzierT > 1)
		{
				this.x = this.p4.x;
				this.y = this.p4.y;
				this.z = this.p4.z;
				this.exploded = true;
				if(this.target != null) this.target.exploded = true;
		}
	}

}