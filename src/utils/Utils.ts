import { BuilderConfig } from "../builders/BuilderConfig";
import * as PIXI from "pixi.js";

/*export class Position {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}*/

export class Utils {
    // hack para fazer o cálculo de conversão
    public static view: HTMLCanvasElement;

    public static ConvertCellPosToPosition(cellPos: number): PIXI.Point {
        const halfHeight = Utils.view.height / 2;
        const halfWidth = Utils.view.width / 2;
        const halfBlockWidth = BuilderConfig.WorldCellWidth / 2;
        const offsetToOrigin = -(BuilderConfig.NumWorldCells / 2.0) * BuilderConfig.WorldCellWidth - halfBlockWidth;
        const offsetToCell = cellPos * BuilderConfig.WorldCellWidth;
        const newPosX = halfWidth + offsetToOrigin + offsetToCell;

        const pos = new PIXI.Point(newPosX, halfHeight);

        return pos;
    }

    public static ScaleToWindow(canvas: HTMLCanvasElement): number {
        let center;

        //1. Scale the canvas to the correct size
        //Figure out the scale amount on each axis
        const scaleX = window.innerWidth / canvas.offsetWidth;
        const scaleY = window.innerHeight / canvas.offsetHeight;

        //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
        const scale = Math.min(scaleX, scaleY);
        canvas.style.transformOrigin = "0 0";
        canvas.style.transform = "scale(" + scale + ")";

        //2. Center the canvas.
        //Decide whether to center the canvas vertically or horizontally.
        //Wide canvases should be centered vertically, and
        //square or tall canvases should be centered horizontally
        if (canvas.offsetWidth > canvas.offsetHeight) {
            if (canvas.offsetWidth * scale < window.innerWidth) {
                center = "horizontally";
            } else {
                center = "vertically";
            }
        } else {
            if (canvas.offsetHeight * scale < window.innerHeight) {
                center = "vertically";
            } else {
                center = "horizontally";
            }
        }

        //Center horizontally (for square or tall canvases)
        let margin;
        if (center === "horizontally") {
            margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
            canvas.style.marginTop = 0 + "px";
            canvas.style.marginBottom = 0 + "px";
            canvas.style.marginLeft = margin + "px";
            canvas.style.marginRight = margin + "px";
        }

        //Center vertically (for wide canvases)
        if (center === "vertically") {
            margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
            canvas.style.marginTop = margin + "px";
            canvas.style.marginBottom = margin + "px";
            canvas.style.marginLeft = 0 + "px";
            canvas.style.marginRight = 0 + "px";
        }

        //3. Remove any padding from the canvas  and body and set the canvas
        //display style to "block"
        canvas.style.paddingLeft = 0 + "px";
        canvas.style.paddingRight = 0 + "px";
        canvas.style.paddingTop = 0 + "px";
        canvas.style.paddingBottom = 0 + "px";
        canvas.style.display = "block";

        //4. Set the color of the HTML body background
        //document.body.style.backgroundColor = backgroundColor;

        //Fix some quirkiness in scaling for Safari
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("safari") != -1) {
            if (ua.indexOf("chrome") > -1) {
                // Chrome
            } else {
                // Safari
                //canvas.style.maxHeight = "100%";
                //canvas.style.minHeight = "100%";
            }
        }

        //5. Return the `scale` value. This is important, because you'll nee this value
        //for correct hit testing between the pointer and sprites
        return scale;
    }
}
