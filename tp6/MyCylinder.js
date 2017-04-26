/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
	 this.texCoords = [];

 	var angle=0;
 	
 	var vi=1;
 	var angIncrement=(2*Math.PI) / this.slices;
 	var stackIncrement = 1;

	for(var i=0; i<=this.slices; i++)
	{
		var x1=Math.cos(angle);
		var y1=Math.sin(angle);
		var z=0;

		for(var a=0; a<= this.stacks; a++){
			this.vertices.push(x1,y1,z);
			this.texCoords.push(x1*0.5 + 0.5, 0.5 - y1*0.5,z);
			this.normals.push(x1,y1,0);
			z=stackIncrement+z;
		}
		angle+=angIncrement;
		
	}

    for (var i = 0; i < this.slices; i++) {

        for (var j = 0; j < this.stacks; j++) {
			
            this.indices.push(vi, vi + this.stacks, vi + this.stacks + 1);
            this.indices.push(vi + this.stacks, vi, vi - 1);
            this.indices.push(vi + this.stacks + 1, vi + this.stacks, vi);
            this.indices.push(vi, vi + this.stacks, vi - 1);

            vi++;
        }

        vi++;
    }
		
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
	
 	
 };
