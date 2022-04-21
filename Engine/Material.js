
class Material {

    constructor(bounce = 1.0, staticFriction = 0.6, dynamicFriction = 0.6, mass = 1.0) 
    {
        this.bounce = bounce;
        this.staticFriction = staticFriction;
        this.dynamicFriction = dynamicFriction;
        this.mass = mass;
    }
}

export default Material;