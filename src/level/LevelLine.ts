import { Graphics } from "pixi.js";

export class LevelLine {
    private width: number;
    private color: number;
    private renderer: Graphics;

    constructor(width: number) {
        this.width = width;

        // cinza
        this.color = 0x808080;

        /*const str = "#800000";
        const c = parseInt(str.replace(/^#/, ""), 16);*/

        this.renderer = new Graphics();
        this.renderer.lineStyle(4, this.color, 1);
        this.renderer.moveTo(0, 100);
        this.renderer.lineTo(80, 100);
        this.renderer.x = 32;
        this.renderer.y = 32;
    }

    public GetView(): Graphics {
        return this.renderer;
    }

    public SetWidth(width: number): void {
        this.width = width;
    }

    public GetWidth(): number {
        return this.width;
    }

    public SetColor(color: number): void {
        this.color = color;
    }

    public GetColor(): number {
        return this.color;
    }
}
