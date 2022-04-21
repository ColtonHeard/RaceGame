import Rectangle from "../Engine/Rectangle.js";
import Circle from "../Engine/Circle.js";
import Point from "../Engine/Point.js";
import Game from "../Engine/Game.js";
import Collisions from "../Engine/Collisions.js";

class Physics 
{

    static groundedCheckDepth = 5;

    static checkIfGrounded(object)
    {
        let object_shape = object.getComponent("Rectangle") != undefined ? object.getComponent("Rectangle") : object.getComponent("Circle");

        let groundedCollisionObject = null;
        let groundedPoints = null;

        if (object_shape instanceof Rectangle)
        {
            groundedPoints = [new Point(null, object_shape.x + (object_shape.w / 2), object_shape.y + object_shape.h + Physics.groundedCheckDepth), 
                new Point(null, object_shape.x, object_shape.y + object_shape.h + Physics.groundedCheckDepth), 
                new Point(null, object_shape.x + object_shape.w, object_shape.y + object_shape.h + Physics.groundedCheckDepth)]
        }
        else if (object_shape instanceof Circle)
        {
            groundedPoints = [new Point(null, object_shape.x, object_shape.y + object_shape.r + Physics.groundedCheckDepth)]
        }
        else 
        {
            console.log("Physics.checkIfGrounded() passed a non Circle or Rectangle!!!");
            return null;
        }

        for (let point of groundedPoints)
        {
            groundedCollisionObject = this.checkCollisionWithPoint(object, point);
            if (groundedCollisionObject != null)
            {
                return groundedCollisionObject;
            }
        }

        return null;
    }

    // Checks an object for collision with any other object in the scene.
    // Returns the object shape that it collided with if so, otherwise returns null.
    static checkCollision(object1)
    {
        let object1_shape = object1.getComponent("Rectangle") != undefined ? object1.getComponent("Rectangle") : object1.getComponent("Circle");

        for(let object2 of Game.getActiveScene().getGameObjects().filter(g=>g.getFirstComponentOfType(Rectangle) != undefined || g.getFirstComponentOfType(Circle) != undefined))
        {
            if (object2 == object1) continue;

            let object2_shape = object2.getFirstComponentOfType(Rectangle) != undefined ? object2.getFirstComponentOfType(Rectangle) : object2.getFirstComponentOfType(Circle);

            if (Collisions.inCollision(object1_shape, object2_shape))
            {
                return object2_shape;
            }
        }
        return null;
    }

    static checkCollisionWithPoint(object1, point)
    {
        for(let object2 of Game.getActiveScene().getGameObjects().filter(g=>g.getFirstComponentOfType(Rectangle) != undefined || g.getFirstComponentOfType(Circle) != undefined))
        {
            if (object2 == object1) continue;

            let object2_shape = object2.getFirstComponentOfType(Rectangle) != undefined ? object2.getFirstComponentOfType(Rectangle) : object2.getFirstComponentOfType(Circle);

            if (Collisions.inCollision(point, object2_shape))
            {
                return object2_shape;
            }
        }
        return null;
    }

    static checkCollisionUsingShapeIgnoringOther(shape, other)
    {
        for(let object2 of Game.getActiveScene().getGameObjects().filter(g=>g.getFirstComponentOfType(Rectangle) != undefined || g.getFirstComponentOfType(Circle) != undefined))
        {
            if (object2 == other) continue;

            let object2_shape = object2.getFirstComponentOfType(Rectangle) != undefined ? object2.getFirstComponentOfType(Rectangle) : object2.getFirstComponentOfType(Circle);

            if (Collisions.inCollision(shape, object2_shape))
            {
                return object2_shape;
            }
        }
        return null;
    }

    static morphBasedOnVelocity(xVel, yVel, xMax, yMax, x, y, w, h, horizontalPower, verticalPower)
    {
        let newX = x;
        let newY = y;
        let newW = w;
        let newH = h;

        if (xVel > 0)
        {
            newW -= ((xVel/xMax) * (w/horizontalPower));
        }
        else if (xVel < 0)
        {
            let adj = ((Math.abs(xVel)/xMax) * (w/horizontalPower));
            newX += adj;
            newW -= adj;
        }

        if (yVel > 0)
        {
            newH -= ((yVel/yMax) * (h/verticalPower));
        }
        else if (yVel < 0)
        {
            let adj = ((Math.abs(yVel)/yMax) * (h/verticalPower));
            newY += adj;
            newH -= adj;
        }

        // console.log("newX: "+newX+" newY: "+newY+" newW: "+newW+" newH: "+newH)
        return [newX, newY, newW, newH];
    }

}

export default Physics;