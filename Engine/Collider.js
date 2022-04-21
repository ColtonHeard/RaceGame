import Component from "./Component.js";
import Material from "./Material.js";

class Collider extends Component {

    constructor(parent) {
        super(parent);

        if (this.constructor === Collider) {
          throw new Error("Cannot instantiate abstract class: Collider!");
        }
    
        this.enabled = true;
        this.material = new Material();
    }

    checkCollision(object) {};

    getCollisionPoints() {};

}

export default Collider;