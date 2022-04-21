import GameObject from "../Engine/GameObject.js";
import Point from "../Engine/Point.js";
import PointDraw from "../Engine/PointDraw.js";
import Rectangle from "../Engine/Rectangle.js";
import RectangleCollider from "../Engine/RectangleCollider.js";
import RectangleDraw from "../Engine/RectangleDraw.js";

import PlayerUpdateComponent from "./PlayerUpdateComponent.js";
import MorphDraw from "./MorphDraw.js";
import Weapon from "./Weapon.js";

class PlayerObject extends GameObject {

    constructor(x,y) {
        super("Player", -1, false);

        let playerUpdate = new PlayerUpdateComponent(this);

        this.components.push(new Rectangle(this, x, y, PlayerUpdateComponent.playerWidth, PlayerUpdateComponent.playerHeight));
        this.components.push(new MorphDraw(this, `rgb(${0},${0},${255})`, "blue", playerUpdate, 10, 10));
        this.components.push(new RectangleCollider(this));
        this.components.push(new Point(x, y - 10));
        this.components.push(new PointDraw(this, "red", "red"));
        this.components.push(playerUpdate);
        this.components.push(new Weapon(x,y));
    }

}

export default PlayerObject;