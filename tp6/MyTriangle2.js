/**
 * MyTriangle2
 * @constructor
 */
function MyTriangle2(scene) {
    CGFobject.call(this, scene);
    this.initBuffers();
};

MyTriangle2.prototype = Object.create(CGFobject.prototype);
MyTriangle2.prototype.constructor = MyTriangle2;
MyTriangle2.prototype.initBuffers = function() {
    this.vertices = [
    	0,0,0,
    	1.0,0,0,
    	0,0,1.0
    ];

    this.indices = [
        2,1,0
    ];

    this.normals = [
       0, 1,0,
       0, 1,0,
       0,1 ,0
    ];
    
    this.texCoords = [
    	0,0,
    	1,0,
    	0,1
    
    	
    ];
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};