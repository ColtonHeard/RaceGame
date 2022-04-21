import Component from "../Engine/Component.js";
import Rectangle from "../Engine/Rectangle.js";
import Game from "../Engine/Game.js";
import Time from "../Engine/time.js";

import Physics from "./Physics.js";

class JumperUpdateComponent extends Component
{

    static gravity = 0.25;

    static timeBetweenJumps = 4;
    static jumpHeight = 10;
    static jumpForwardMomentum = 4;
    static jumperSlow = 0.15;

    constructor(parent)
    {
        super(parent);
        this.onGround = false;
        this.horizontalVelocity = 0.0;
        this.verticalVelocity = 0.0;
        this.jumpCooldown = 0;

        this.maxSpeed = 4;
        this.maxVerticalSpeed = 10;
    }

    update()
    {
        let rect = this.parent.getComponent("Rectangle");
        let point = this.parent.getComponent("Point");
        let player = Game.getActiveScene().findGameObject("PlayerObject").getComponent("Rectangle");

        point.x = rect.x + (rect.w / 2);
        point.y = rect.y + rect.h + 5;

        let proposedVelocityX = this.horizontalVelocity;
        let proposedVelocityY = this.verticalVelocity;

        // Try to jump towards the player (if within a certain distance?)
        if (this.onGround && this.jumpCooldown >= JumperUpdateComponent.timeBetweenJumps)
        {
            this.jumpCooldown = 0;

            if (player.x > rect.x)
            {
                // Jump Right
                proposedVelocityX += JumperUpdateComponent.jumpForwardMomentum * (1 - (Math.random() * 0.2));
            }
            else 
            {
                // Jump Left
                proposedVelocityX -= JumperUpdateComponent.jumpForwardMomentum * (1 - (Math.random() * 0.2));
            }

            proposedVelocityY -= JumperUpdateComponent.jumpHeight;
        }
        else if (this.onGround)
        {
            this.jumpCooldown += Time.secondsBetweenFrame;
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
            // console.log("Jumper movin")
            rect.x += proposedVelocityX;
            this.horizontalVelocity = proposedVelocityX;
        }
        else
        {
            // console.log("Jumper hit wall")
            this.horizontalVelocity = this.horizontalVelocity * 0.9;
            if (collision.y > rect.y + rect.h && collision.y - (rect.y + rect.h) < 5)
            {
                rect.y = collision.y - rect.h - 4;
            }
        }

        // Try to move vertically
        collision = Physics.checkCollisionUsingShapeIgnoringOther(new Rectangle(null, rect.x, rect.y + proposedVelocityY, rect.w, rect.h), this.parent)
        if (collision == null)
        {
            // console.log("Jumper jumpin")
            rect.y += proposedVelocityY;
            this.verticalVelocity = proposedVelocityY;
        }
        else 
        {
            // console.log("Jumper collided")
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
            this.slowIfIdle();
        }
        else { this.onGround = false; }

        // Adjust for gravity
        if (!this.onGround)
        {
            this.verticalVelocity += JumperUpdateComponent.gravity;
        }

        // console.log("Grounded: "+this.onGround+" xVel: "+this.horizontalVelocity+" yVel: "+this.verticalVelocity);
    }

    slowIfIdle() 
    {
        // console.log("Slowing Jumper")
        if (this.horizontalVelocity > 0)
        {
            this.horizontalVelocity = Math.max(this.horizontalVelocity - JumperUpdateComponent.jumperSlow, 0);
        }
        else if (this.horizontalVelocity < 0)
        {
            this.horizontalVelocity = Math.min(this.horizontalVelocity + JumperUpdateComponent.jumperSlow, 0);
        }
    }
}

export default JumperUpdateComponent;