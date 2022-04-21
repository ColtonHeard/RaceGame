import Collider from "./Collider.js";
import Point from "./Point.js";

class CircleCollider extends Collider {

    constructor(parent) {
        super(parent);
    }

    /*
    *   Use the distance formula to check if points lie in the circle.
    */
    checkCollision(object) {
        let points = object.getComponentOfType(Collider).getCollisionPoints();
        let circ = this.parent.getComponent("Circle");

        for (const point of points) {
            let distance = Math.sqrt(Math.pow(circ.x - point.x, 2) + Math.pow(circ.y - point.y, 2));
            let isInside = distance <= circ.r;
            
            if (isInside)
            {
                console.log(`Circle collided with point (${Math.round(point.x)}, ${Math.round(point.y)})\n`);
                return true;
            }
        }

        return false;
    }

    getCollisionPoints() {
        let points = [];
        let circ = this.parent.getComponent("Circle");

        /* Check 8 points: horizontal, vertical, and diagonal */
        points.push(new Point(circ.x, circ.y - circ.r));
        points.push(this.getPointForAngle(circ.r, Math.PI / 4));

        points.push(new Point(circ.x + circ.r, circ.y));
        points.push(this.getPointForAngle(circ.r, (3 * Math.PI) / 4));

        points.push(new Point(circ.x, circ.y + circ.r));
        points.push(this.getPointForAngle(circ.r, (5 * Math.PI) / 4));

        points.push(new Point(circ.x - circ.r, circ.y));
        points.push(this.getPointForAngle(circ.r, (7 * Math.PI) / 4));
    
        return points;
    }

    /*
    *   x = radius * sin(angle)
    *   y = radius * cos(angle)
    */
    getPointForAngle(radius, angle) {
        let x = radius * Math.sin(angle);
        let y = radius * Math.cos(angle);

        return new Point(x, y);
    }
}

export default CircleCollider;