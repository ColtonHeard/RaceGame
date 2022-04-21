import Circle from "../Engine/Circle.js";
import GameObject from "../Engine/GameObject.js";
import Line from "../Engine/Line.js";
import LineDraw from "../Engine/LineDraw.js";

import WeaponDraw from "./WeaponDraw.js"
import WeaponUpdateComponent from "./WeaponUpdateComponent.js";


class Weapon extends GameObject
{
    constructor(x,y) {
        super("Weapon", 0, false);

        this.components.push(new Circle(this, x, y, 40));
        this.components.push(new WeaponDraw(this, "red", "red"));
        // this.components.push(new Line(this, 0, 0, 0, 0));
        // this.components.push(new LineDraw(this, "purple"));
        this.components.push(new WeaponUpdateComponent(this));
    }
}

export default Weapon;