let activeScene = null;
// List of scenes

class Game {
    
    consturctor() {
        if (this instanceof Game) {
            throw Error("The Game class is static and cannot be instantiated!");
        }
    }

    static setActiveScene(scene) {
        activeScene = scene;
    }

    static getActiveScene(scene) {
        return activeScene;
    }

    static update() {
        activeScene.update();
    }

    static draw(ctx) {
        activeScene.draw(ctx);
    }

    static remove() {
        activeScene.remove();
    }

}

export default Game;