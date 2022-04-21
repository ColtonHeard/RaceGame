import GameObject from "../Engine/GameObject.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleDraw from "../Engine/RectangleDraw.js";
import Circle from "../Engine/Circle.js";
import CircleDraw from "../Engine/CircleDraw.js";

import Constants from "./Constants.js";
import CircleCollider from "../Engine/CircleCollider.js";
import RectangleCollider from "../Engine/RectangleCollider.js";

class WallGameObject extends GameObject {

    constructor(x, y, w, h, r, shape) {
        super("WallObject", -2, true);

        if (shape == Constants.RECT)
        {
            this.components.push(new Rectangle(this, x, y, w, h));
            this.components.push(new RectangleDraw(this, "white", "white"));
            this.components.push(new RectangleCollider(this));
        }
        else if (shape == Constants.CIRC)
        {
            this.components.push(new Circle(this, x, y, r));
            this.components.push(new CircleDraw(this, "white", "white"));
            this.components.push(new CircleCollider(this));
        }
      }
    
      // update() {
      //   let collider = this.getComponent("CircleCollider");

      //   for(let object of Game.getActiveScene().getGameObjects().filter(g=>g.getComponentOfType(Collider) != undefined))
      //   {
      //       if (object != this && collider.checkCollision(object))
      //       {
      //           return true;
      //       }
      //   }
      // }
    
      draw(ctx) {
        this.components.filter(c=>c.draw).forEach(c=>c.draw(ctx));
      }

}

export default WallGameObject;