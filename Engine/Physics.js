import Material from "./Material.js"
import Rectangle from "./Rectangle.js";
import Circle from "./Circle.js";

class Physics {

    static applyGravity(object) {
        mat = object.getFirstComponentOfType(Material);
        base = object.getFirstComponentOfType(Rectangle) != undefined ? object.getFirstComponentOfType(Rectangle) : object.getFirstComponentOfType(Circle);

        

    }
}

export default Physics;