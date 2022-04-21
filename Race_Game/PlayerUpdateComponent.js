import Component from "../Engine/Component.js";
import Input from "../Engine/Input.js";
import Game from "../Engine/Game.js";
import Rectangle from "../Engine/Rectangle.js";
import Circle from "../Engine/Circle.js";
import Point from "../Engine/Point.js";

import Physics from "./Physics.js";

class PlayerUpdateComponent extends Component {

    static playerHeight = 80;
    static playerWidth = 40;

    static playerAcceleration = 0.1;

    constructor(parent) {
      super(parent);
      this.moveLeft = false;
      this.moveRight = false;
      this.moveUp = false;
      this.moveDown = false;
      this.facingRight = false;

      this.horizontalVelocity = 0.0;
      this.verticalVelocity = 0.0;
      this.onGround = false;
      this.jumped = false;

      this.maxSpeed = 5;
      this.maxVerticalSpeed = 10;

      this.playerGravity = 0.5;
      this.playerSlow = 0.2;
      this.jumpStrength = 10;
    }

    update() {

        let rect = this.parent.getComponent("Rectangle");
        let point = this.parent.getComponent("Point");
        let weaponShape = this.parent.getComponent("Weapon").getComponent("Circle");

        point.x = rect.x + (rect.w / 2);
        point.y = rect.y + rect.h + 5;

        this.pollInput();

        this.slowIfIdle();

        let proposedVelocityX = this.horizontalVelocity;
        let proposedVelocityY = this.verticalVelocity;

        // if (this.moveUp)
        //     proposedVelocityY -= PlayerUpdateComponent.playerAcceleration;
        // if (this.moveDown)
        //     proposedVelocityY += PlayerUpdateComponent.playerAcceleration;
        if (this.moveLeft)
        {
            proposedVelocityX -= PlayerUpdateComponent.playerAcceleration;
            this.facingRight = false;
            // console.log("moving left")
        }
        if (this.moveRight)
        {
            proposedVelocityX += PlayerUpdateComponent.playerAcceleration;
            this.facingRight = true;
        }
        if (this.jumped)
        {
            proposedVelocityY -= this.jumpStrength;
            this.onGround = false;
        }

        if (proposedVelocityX > this.maxSpeed)
            proposedVelocityX = this.maxSpeed;
        else if (proposedVelocityX < -this.maxSpeed)
            proposedVelocityX = -this.maxSpeed;

        if (proposedVelocityY > this.maxVerticalSpeed)
            proposedVelocityY = this.maxVerticalSpeed;
        else if (proposedVelocityY < -this.maxVerticalSpeed)
            proposedVelocityY = -this.maxVerticalSpeed;


        // console.log("Vel X:"+proposedVelocityX+" Vel Y:"+proposedVelocityY);
        // console.log("Checking rect at x:"+(rect.x+proposedVelocityX)+" and y:"+(rect.y + proposedVelocityY));

        // Try to move horizontally
        let collision = Physics.checkCollisionUsingShapeIgnoringOther(new Rectangle(null, rect.x + proposedVelocityX, rect.y, rect.w, rect.h), this.parent)
        if (collision == null)
        {
            rect.x += proposedVelocityX;
            this.horizontalVelocity = proposedVelocityX;
        }
        else if (!this.jumped && collision != null)
        {
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
        if (!this.jumped && !this.onGround)
        {
            // console.log("Applying Gravity")
            this.verticalVelocity += this.playerGravity;
        }

        // Update weapon position
        weaponShape.y = rect.y + (rect.h * 0.3);
        if (this.facingRight)
        {
            weaponShape.x = rect.x + rect.w;
        }
        else
        {
            weaponShape.x = rect.x;
        }
    }

    slowIfIdle() 
    {
        if (!(this.moveLeft || this.moveRight))
        {
            if (this.horizontalVelocity > 0)
            {
                this.horizontalVelocity = Math.max(this.horizontalVelocity - this.playerSlow, 0);
            }
            else if (this.horizontalVelocity < 0)
            {
                this.horizontalVelocity = Math.min(this.horizontalVelocity + this.playerSlow, 0);
            }

            // if (this.playerVerticalSpeed > 0)
            // {
            //     proposedVelocityY = Math.max(proposedVelocityY - PlayerUpdateComponent.playerAcceleration, 0);
            // }
            // else if (this.playerVerticalSpeed < 0)
            // {
            //     proposedVelocityY = Math.min(proposedVelocityY + PlayerUpdateComponent.playerAcceleration, 0);
            // }
        }
    }

    pollInput() {
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.jumped = false;

        // if (Input.getKey("w"))
        //     this.moveUp = true;
        // if (Input.getKey("s"))
        //     this.moveDown = true;
        if (Input.getKey("a"))
            this.moveLeft = true;
        if (Input.getKey("d"))
            this.moveRight = true;
        if (this.onGround && Input.getKey(" "))
            this.jumped = true;
        // if (Input.getKeyDown("e"))
        //     this.createProjectile();
    }

    // createProjectile()
    // {
    //     let rect = this.parent.getComponent("Rectangle");
    //     let projectile = new ProjectileGameObject(rect.x + (PlayerUpdateComponent.playerWidth / 2), rect.y, -1, [this.parent.constructor.name]);
    //     Game.getActiveScene().getGameObjects().push(projectile);
    // }
  }

  export default PlayerUpdateComponent;