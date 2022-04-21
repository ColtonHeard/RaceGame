import Component from "../Engine/Component.js";

import PlayerUpdateComponent from "./PlayerUpdateComponent.js";

class PlayerDraw extends Component
{
    constructor(parent, fillStyle, strokeStyle) {
        super(parent);
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }

    draw(ctx) {
        let rectangle = this.parent.getComponent("Rectangle");
        let playerUpdate = this.parent.getComponent("PlayerUpdateComponent");

        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        let xVel = playerUpdate.playerHorizontalSpeed;
        let yVel = playerUpdate.playerVerticalSpeed;
        let max = PlayerUpdateComponent.playerMaxSpeed;
        let x = rectangle.x;
        let y = rectangle.y;
        let w = rectangle.w;
        let h = rectangle.h;

        if (xVel > 0)
        {
            w -= ((xVel/max) * (w/10));
        }
        else if (xVel < 0)
        {
            let adj = ((Math.abs(xVel)/max) * (w/10));
            x += adj;
            w -= adj;
        }

        if (yVel > 0)
        {
            h -= ((yVel/max) * (h/10))
        }
        else if (yVel < 0)
        {
            let adj = ((Math.abs(yVel)/max) * (h/10));
            y += adj;
            h -= adj;
        }

        ctx.beginPath();
        ctx.rect(
            x,
            y,
            w,
            h,
        )
        ctx.fill()
        ctx.stroke()
    }
}

export default PlayerDraw;