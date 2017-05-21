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
    this.cube= new MyUnitCubeQuad(scene, 0,1,0,1);
    this.cube.initBuffers();
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyUnitCubeQuad;
MyTarget.prototype.display = function(){
	switch(this.appearence){
	case 0:{
		this.scene.homerAppearence.apply();
		this.cube.display();
	}
	break;
	case 1:{
		this.scene.bullseyeAppearence.apply();
		this.cube.display();
	}
	break;
	case 2:{
		this.scene.naperonAppearence.apply();
		this.cube.display();
	}
	break;
	case 3:{
		this.scene.metal_rustyAppearence.apply();
		this.cube.display();
	}
	break;
	case 4:{
		this.scene.spongeAppearence.apply();
		this.cube.display();
	}
	break;
	}
	
};
