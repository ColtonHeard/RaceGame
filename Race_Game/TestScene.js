import Scene from "../Engine/Scene.js"

// import PlayerGameObject from "./PlayerGameObject.js";
import WallGameObject from "./WallGameObject.js";
import Constants from "./Constants.js";
import PlayerObject from "./PlayerObject.js"
import Goomba from "./Goomba.js";
import Jumper from "./Jumper.js";

class TestScene extends Scene {

    constructor(canvas) {
        super("Test Scene", "black");

        this.cameraULX = 200;
        this.cameraULY = 200;
        this.cameraCenterX = 0;
        this.cameraCenterY = 0;
        this.cameraSize = 200;
        this.bounds = 200;

        this.gameObjects.push(new PlayerObject(100, 200));

        this.gameObjects.push(new WallGameObject(0, 0, 2900, 50, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(0, 50, 50, 950, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(2850, 50, 50, 950, null, Constants.RECT))

        this.gameObjects.push(new WallGameObject(50, 950, 300, 50, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(300, 1000, 50, 60, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(350, 1010, 500, 50, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(850, 1000, 50, 60, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(850, 950, 200, 50, null, Constants.RECT))

        this.gameObjects.push(new WallGameObject(1000, 1000, 50, 200, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(1000, 1200, 900, 50, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(1850, 1000, 50, 200, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(1850, 950, 200, 50, null, Constants.RECT))

        this.gameObjects.push(new WallGameObject(2000, 1000, 50, 60, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(2050, 1010, 500, 50, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(2550, 1000, 50, 60, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(2550, 950, 300, 50, null, Constants.RECT))

        this.gameObjects.push(new WallGameObject(1050, 1050, 100, 20, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(1200, 1100, 100, 20, null, Constants.RECT))

        this.gameObjects.push(new WallGameObject(1750, 1050, 100, 20, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(1600, 1100, 100, 20, null, Constants.RECT))

        //Enemies

        this.gameObjects.push(new Goomba(350, 900))

        this.gameObjects.push(new Goomba(2100, 900))
        this.gameObjects.push(new Goomba(2300, 900))

        this.gameObjects.push(new Jumper(1400, 1100))
        this.gameObjects.push(new Jumper(1500, 1100))
        this.gameObjects.push(new Jumper(1600, 1050))

        // Originals
        this.gameObjects.push(new WallGameObject(300, 750, 200, 50, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(550, 650, 200, 50, null, Constants.RECT))
        this.gameObjects.push(new WallGameObject(800, 550, 200, 50, null, Constants.RECT))

        this.gameObjects.push(new WallGameObject(300, 300, null, null, 40, Constants.CIRC))

        this.gameObjects.push(new Goomba(400, 400))
        this.gameObjects.push(new Jumper(900, 500))
    }

    update() {
        super.update();
    }

    draw(ctx) {
        // super.draw(ctx);

        //Move the camera
        let player = this.findGameObject("PlayerObject").getComponent("Rectangle");
        this.cameraCenterX = (player.x + (player.w / 2)) - (ctx.canvas.width / 2);
        this.cameraCenterY = (player.y + (player.h / 2)) - (ctx.canvas.height / 2);

        this.pixelsPerVerticalWorldUnit = ctx.canvas.height / this.bounds;
        this.pixelsPerHorizontalWorldUnit = ctx.canvas.width / this.bounds;
        
        this.cameraULX = ((-this.bounds/2)/this.pixelsPerHorizontalWorldUnit) + this.cameraCenterX;
        this.cameraULY = ((-this.bounds/2)/this.pixelsPerVerticalWorldUnit) + this.cameraCenterY;

        ctx.fillStyle = this.fillColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.save()

        ctx.translate(-this.cameraULX, -this.cameraULY);

        // Draw background and gameobjects 
        for (let i = -2; i <= 0; i++) {
            let thisLayer = this.gameObjects.filter(go=>go.layer == i);

            for (let gameObject of thisLayer) {
                gameObject.draw(ctx);
            }
        }

        ctx.restore()

        // Draw UI Elements
        for (let i = 1; i <= 2; i++) {
            let thisLayer = this.gameObjects.filter(go=>go.layer == i);

            for (let gameObject of thisLayer) {
                gameObject.draw(ctx);
            }
        }
    }

}

export default TestScene;