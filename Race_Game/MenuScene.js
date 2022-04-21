import Scene from "../Engine/Scene.js"

class MenuScene extends Scene {

    constructor(canvas) {
        super();

        this.gameObjects.push(new PlayerGameObject(500, 500));
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        super.draw(ctx);
    }

}

export default MenuScene;