import Component from "../Engine/Component.js";

import Physics from "./Physics.js";

class MorphDraw extends Component
{
    constructor(parent, fillStyle, strokeStyle, updateComponent, horzontalPower, verticalPower) {
        super(parent);
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.updateComponent = updateComponent;
        this.horzontalPower = horzontalPower;
        this.verticalPower = verticalPower;
    }

    draw(ctx) {
        let rect = this.parent.getComponent("Rectangle");

        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        let results = Physics.morphBasedOnVelocity(this.updateComponent.horizontalVelocity, this.updateComponent.verticalVelocity, this.updateComponent.maxSpeed, this.updateComponent.maxVerticalSpeed, rect.x, rect.y, rect.w, rect.h, this.horzontalPower, this.verticalPower)

        ctx.beginPath();
        ctx.rect(
            results[0],
            results[1],
            results[2],
            results[3],
        )
        ctx.fill()
        ctx.stroke()
    }
}

export default MorphDraw;