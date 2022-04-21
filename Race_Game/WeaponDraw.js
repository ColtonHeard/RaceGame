import Component from "../Engine/Component.js"
import Point from "../Engine/Point.js";

class WeaponDraw extends Component {
    constructor(parent, fillStyle, strokeStyle) {
        super(parent);
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }
    draw(ctx){
        let circle = this.parent.getComponent("Circle");
        let weaponUpdate = this.parent.getComponent("WeaponUpdateComponent");

        ctx.save();

        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        let point1 = this.getPointForAngle(circle.r, weaponUpdate.angle - Math.PI/24);
        let point2 = this.getPointForAngle(circle.r, weaponUpdate.angle + Math.PI/24);

        ctx.beginPath();
        ctx.arc(
            circle.x,
            circle.y,
            circle.r,
            weaponUpdate.angle - Math.PI/12,
            weaponUpdate.angle + Math.PI/12,
            false
        )
        // ctx.lineWidth = 2;

        // ctx.moveTo(circle.x, circle.y);
        // ctx.lineTo(point1.x + circle.x, point1.y + circle.y);
        // ctx.lineTo(point2.x + circle.x, point2.y + circle.y);
        // ctx.lineTo(circle.x, circle.y);

        ctx.fill()
        ctx.stroke()
        ctx.closePath();

        ctx.restore();
    }

    getPointForAngle(radius, angle) {
        let x = radius * Math.sin(angle);
        let y = radius * Math.cos(angle);

        return new Point(null, x, y);
    }

}

export default WeaponDraw;