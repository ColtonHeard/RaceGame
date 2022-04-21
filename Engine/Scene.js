class Scene {

    constructor(title, fillColor = "black") {

        if (this.constructor === Scene) {
            throw new Error("Cannot instantiate abstract class: Scene!");
        }

        this.title = title;
        this.fillColor = fillColor;
        this.gameObjects = [];
    }

    getGameObjects() {
        return this.gameObjects;
    }

    update() {
        this.gameObjects.filter(c=>c.update).forEach(c=>c.update());
    }

    draw(ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // TODO Translation Work

        ctx.save()

        // ctx.translate(-Game.cameraULX, -Game.cameraULY);

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

        // this.gameObjects.filter(c=>c.draw).forEach(c=>c.draw(ctx));
    }

    remove() {
        this.gameObjects = this.gameObjects.filter(g=>!g.markForDelete);
    }

    findGameObject(gameObjectString) {
        return this.gameObjects.find(c=>c.constructor.name == gameObjectString);
    }

}

export default Scene;