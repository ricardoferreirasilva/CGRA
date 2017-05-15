/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene) {
    CGFobject.call(this, scene);
    this.x=0;
    this.z=0;
    this.y=0;
    this.ver_angle=0;
    this.hor_angle=0;
    
    this.triangle= new MyTriangle(scene);
    this.hemisphere= new MyHemiSphere(scene,20,8);
    this.cylinder= new MyCylinder(scene,20,1);
    this.flipper= new MyFlipper(scene);
    
    this.triangle.initBuffers();
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTriangle;
MyTorpedo.prototype.display = function() {
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
	this.scene.translate(this.x,this.y,this.z);
	this.scene.rotate(this.ver_angle,0, 1, 0);
	this.scene.rotate(this.hor_angle,1, 0, 0);
		
	//Submarine Display
	this.scene.pushMatrix();
		this.scene.translate(0,-0.7,2.04);
		this.scene.scale(0.25,0.25,0.25);		
		//Back Hemisphere
		this.scene.pushMatrix();
			this.scene.scale(0.5*0.92,0.5*0.92,0.5*0.92);
			this.scene.rotate(180 * degToRad,0, 1, 0);
			this.hemisphere.display();
		this.scene.popMatrix();	
		//Cylinder (Body)
		this.scene.pushMatrix();
			this.scene.scale(0.5*0.92,0.5*0.92,4.08);
			this.cylinder.display();
		this.scene.popMatrix();
		//front Hemisphere
		this.scene.pushMatrix();
			this.scene.scale(0.5*0.92,0.5*0.92,0.5*0.92);
			this.scene.translate(0,0,8.85);
			this.hemisphere.display();
		this.scene.popMatrix();	
	this.scene.popMatrix();
	
	 //Back Flippers
    this.scene.pushMatrix();
    	this.scene.translate(0,-0.7,2.04);
    	this.scene.scale(0.2,0.2,0.2);
    	this.scene.translate(0,0,0.15);
    	this.scene.rotate(180 * degToRad,1, 0, 0);
    	this.scene.rotate(90 * degToRad,0, 1, 0);
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
	
}