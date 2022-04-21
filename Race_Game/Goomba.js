import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import Point from "../Engine/Point.js";
import PointDraw from "../Engine/PointDraw.js";

import GoombaUpdateComponent from "./GoombaUpdateComponent.js";
import MorphDraw from "./MorphDraw.js";

class Goomba extends GameObject {

    constructor(x, y) {
        super("Goomba", -2, false);
        this.x = x;
        this.y = y;

        this.start();
    }

    start()
    {
        let updateComponent = new GoombaUpdateComponent(this);

        this.components.push(new Rectangle(this, this.x, this.y, 30, 30));
        this.components.push(new MorphDraw(this, "brown", "brown", updateComponent, 5, 2));
        this.components.push(new Point(this.x, this.y - 10));
        this.components.push(new PointDraw(this, "red", "red"));
        this.components.push(updateComponent);
    }

}

export default Goomba;