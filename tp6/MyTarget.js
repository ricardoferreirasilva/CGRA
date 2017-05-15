/**
 * MyTarget
 * @constructor
 */
function MyTarget(scene, x, y, z) {
    CGFobject.call(this, scene);
    
    this.x=x;
    this.z=z;
    this.y=y;    
    
    this.appearence=0;//0 - bullseye, 1 - homer
    this.quad= new MyQuad(scene, 0,1,0,1);
    this.quad.initBuffers();
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyQuad;
MyTarget.prototype.display = function(){
	switch(this.appearence){
	case 0:{
		this.scene.bullseyeAppearence.apply();
		this.quad.display();
	}
	break;
	case 1:{
		this.scene.homerAppearence.apply();
		this.quad.display();
	}
	break;
	}
	
};
