import Collider from "./Collider.js";
import Point from "./Point.js";

class RectangleCollider extends Collider {

    constructor(parent) {
        super(parent);
    }

    // Have a method that generates a list of points to check?
    checkCollision(object) {
        let points = object.getComponentOfType(Collider).getCollisionPoints();
        let rect = this.parent.getComponent("Rectangle");

        for (const point of points) {
            let insideX = point.x > rect.x && point.x < rect.x + rect.w;
            let insideY = point.y > rect.y && point.y < rect.y + rect.h;
            
            if (insideX && insideY)
            {
                return true;
            }
        }

        return false;
    }

    getCollisionPoints() {
        let points = [];
        let rect = this.parent.getComponent("Rectangle");

        points.push(new Point(rect.x, rect.y));
        points.push(new Point(rect.x + rect.w, rect.y));
        points.push(new Point(rect.x, rect.y + rect.h));
        points.push(new Point(rect.x + rect.w, rect.y + rect.h));
    
        points.push(new Point(rect.x + (rect.w / 2), rect.y));
        points.push(new Point(rect.x + (rect.w / 2), rect.y + rect.h));
        points.push(new Point(rect.x, rect.y + (rect.h / 2)));
        points.push(new Point(rect.x + rect.w, rect.y + (rect.h / 2)));

        
        return points;
    }
}

export default RectangleCollider;