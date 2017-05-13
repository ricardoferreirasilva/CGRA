/**
 * MyProppeller
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyProppeller(scene) {
    CGFobject.call(this, scene);
    
    this.angle=0;
    
    this.hemisphere= new MyHemiSphere(scene,20,8);
    this.cylinder= new MyCylinder(scene,20,1);
    this.cube = new MyUnitCubeQuad(scene);
    this.circle= new MyCircle(scene,20);
    
    this.cube.initBuffers();
};

MyProppeller.prototype = Object.create(CGFobject.prototype);
MyProppeller.prototype.constructor = MyUnitCubeQuad;
MyProppeller.prototype.display = function() {
	
	 this.cylinder.display();
	 
	 this.scene.pushMatrix();
	 	this.scene.translate(0,0,0.2);
	 	this.scene.scale(0.35,0.35,0.8);
	 	this.hemisphere.display();
	 	
	 	this.scene.translate(0,0,0);
	 	this.scene.rotate(180 * degToRad,0, 1, 0);
	 	this.circle.display();
	 this.scene.popMatrix();
	 
	 this.scene.pushMatrix();
		 this.scene.translate(0,0,0.5);
		 this.scene.rotate(this.angle * degToRad,0, 0, 1);
		 this.scene.scale(0.25,1.85,0.5);
		 this.cube.display();
	 this.scene.popMatrix();
	
	 
};

MyProppeller.prototype.incAngle = function(newAngle){
	this.angle= newAngle;
	
};

MyProppeller.prototype.decAngle = function(newAngle){
	this.angle= newAngle;
	
};
