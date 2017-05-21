/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

//Receive this from submarine
function MySpawnTorpedo(scene,x,y,z, hor_angle, ver_angle) {
    CGFobject.call(this, scene);
    this.x=x;
    this.z=z;
    this.y=y;
    this.ver_angle=ver_angle;
    this.hor_angle=hor_angle;
    this.torpedo = new MyTorpedo(this.scene,this.z,this.y,this.x,this.hor_angle,this.ver_angle);
};

MySpawnTorpedo.prototype = Object.create(CGFobject.prototype);
MySpawnTorpedo.prototype.constructor = MyTriangle;
MySpawnTorpedo.prototype.display = function() {
       //this.scene.translate(this.x,this.y,this.z);
	 this.scene.pushMatrix();
	 	this.scene.translate(this.torpedo.x,this.torpedo.y,this.torpedo.z);
		this.scene.rotate(this.torpedo.hor_bezier+Math.PI,0, 1, 0);
		this.scene.rotate(this.torpedo.ver_bezier,1, 0, 0);
       this.torpedo.display();
    this.scene.popMatrix();
	
};
MySpawnTorpedo.prototype.update = function(currTime){
    //console.log("launch");
    var bool = this.torpedo.update(currTime);
    this.lastime = this.lastime || currTime;
 	var dt = currTime - this.lastime;
	this.lastime = currTime;
    this.torpedo.launch();
   
}