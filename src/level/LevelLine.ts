import { Graphics } from "pixi.js";
import { BuilderConfig } from "../builders/BuilderConfig";

export class LevelLine {
    private width: number;
    private color: number;
    private renderer: Graphics;

    constructor(width: number) {
        this.width = width;

        // cinza
        this.color = 0x808080;

        this.renderer = new Graphics();
        this.renderer.lineStyle(6, this.color, 1);
    }

    public GetView(): Graphics {
        return this.renderer;
    }

    public SetCenter(x: number, y: number): void {
        this.renderer.x = x;
        this.renderer.y = y;
    }

    public SetWidth(width: number): void {
        this.width = width;

        const halfWidth = width / 2;
        const halfBlockWidth = BuilderConfig.WorldCellWidth / 2;
        this.renderer.moveTo(-halfWidth + halfBlockWidth, 0);
        this.renderer.lineTo(halfWidth - halfBlockWidth, 0);
    }

    public GetWidth(): number {
        return this.width;
    }

    public SetColor(color: number): void {
        this.color = color;
        this.renderer.lineStyle(6, color, 1);
    }

    public GetColor(): number {
        return this.color;
    }

    public Destroy(): void {
        this.renderer.destroy();
    }
}
