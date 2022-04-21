import Component from "../Engine/Component.js";
import Rectangle from "../Engine/Rectangle.js";

import Physics from "./Physics.js";

class GoombaUpdateComponent extends Component
{

    static horizontalAcceleration = 0.01;
    static gravity = 0.25;

    constructor(parent)
    {
        super(parent);
        this.movingRight = true;
        this.onGround = false;
        this.horizontalVelocity = 0.0;
        this.verticalVelocity = 0.0;

        this.maxSpeed = 2;
        this.maxVerticalSpeed = 10;
    }

    update()
    {
        let rect = this.parent.getComponent("Rectangle");
        let point = this.parent.getComponent("Point");

        point.x = rect.x + (rect.w / 2);
        point.y = rect.y + rect.h + 5;

        let proposedVelocityX = this.horizontalVelocity;
        let proposedVelocityY = this.verticalVelocity;

        if (this.movingRight)
        {
            proposedVelocityX += GoombaUpdateComponent.horizontalAcceleration;
        }
        else 
        {
            proposedVelocityX -= GoombaUpdateComponent.horizontalAcceleration;
        }

        if (proposedVelocityX > this.maxSpeed)
            proposedVelocityX = this.maxSpeed;
        else if (proposedVelocityX < -this.maxSpeed)
            proposedVelocityX = -this.maxSpeed;

        if (proposedVelocityY > this.maxVerticalSpeed)
            proposedVelocityY = this.maxVerticalSpeed;
        else if (proposedVelocityY < -this.maxVerticalSpeed)
            proposedVelocityY = -this.maxVerticalSpeed;

        // Try to move horizontally
        let collision = Physics.checkCollisionUsingShapeIgnoringOther(new Rectangle(null, rect.x + proposedVelocityX, rect.y, rect.w, rect.h), this.parent)
        if (collision == null)
        {
            // console.log("Goomba movin")
            rect.x += proposedVelocityX;
            this.horizontalVelocity = proposedVelocityX;
        }
        else
        {
            // console.log("Goomba hit wall")
            this.movingRight = !this.movingRight;
            this.horizontalVelocity = this.horizontalVelocity * -1;
            if (collision.y > rect.y + rect.h && collision.y - (rect.y + rect.h) < 5)
            {
                rect.y = collision.y - rect.h - 4;
            }
        }

        // Try to move vertically
        collision = Physics.checkCollisionUsingShapeIgnoringOther(new Rectangle(null, rect.x, rect.y + proposedVelocityY, rect.w, rect.h), this.parent)
        if (collision == null)
        {
            rect.y += proposedVelocityY;
            this.verticalVelocity = proposedVelocityY;
        }
        else 
        {
            if (proposedVelocityY > 0)
            {
                rect.y = collision.y - rect.h - 4;
                this.verticalVelocity = 0.0;
            }
        }

        // Check if the player is grounded
        let groundedCollisionObject = Physics.checkIfGrounded(this.parent);
        if (groundedCollisionObject != null)
        {
            this.onGround = true;
        }
        else { this.onGround = false; }

        // Adjust for gravity
        if (!this.onGround)
        {
            this.verticalVelocity += GoombaUpdateComponent.gravity;
        }

        // console.log("Grounded: "+this.onGround+" xVel: "+this.horizontalVelocity+" yVel: "+this.verticalVelocity);
    }
}

export default GoombaUpdateComponent;