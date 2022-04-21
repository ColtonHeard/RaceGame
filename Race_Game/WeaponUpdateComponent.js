import Component from "../Engine/Component.js";
import Input from "../Engine/Input.js";
import Game from "../Engine/Game.js";


class WeaponUpdateComponent extends Component
{
    constructor(parent)
    {
        super(parent);
        this.angle = 0;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    update()
    {
        let weaponCircle = this.parent.getComponent("Circle");
        // let line = this.parent.getComponent("Line");

        let mouseInfo = Input.getMousePosition();
        let mousePosX = mouseInfo[0] + Game.getActiveScene().cameraULX;
        let mousePosY = mouseInfo[1]+ Game.getActiveScene().cameraULY;
        
        // line.x = weaponCircle.x;
        // line.y = weaponCircle.y;
        // line.x2 = mousePosX;
        // line.y2 = mousePosY;

        this.angle = Math.atan2(mousePosY - weaponCircle.y, mousePosX - weaponCircle.x);

        // console.log("angle: " + (this.angle * (180/Math.PI)));
    }
}

export default WeaponUpdateComponent;