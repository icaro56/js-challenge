import * as PIXI from "pixi.js";
import { CellObject } from "../basic/CellObject";
import { Transform } from "../basic/Transform";
import { BuilderConfig } from "../builders/BuilderConfig";

export class Block extends CellObject implements Transform {
    private view: PIXI.Graphics;

    // altura em unidade de largura
    private size: number;
    private color: number;

    private isInitialBlock: boolean;

    constructor(size: number, color: number, isInitialBlock = true) {
        super();
        this.view = new PIXI.Graphics();
        this.isInitialBlock = isInitialBlock;

        this.size = size;

        this.color = color;

        this.DrawRect(color);
        this.view.scale.y = this.size;

        // centralizando pivot
        const halfBlockWidth = BuilderConfig.WorldCellWidth / 2;
        this.view.pivot.x += halfBlockWidth;
        this.view.pivot.y += halfBlockWidth;
    }

    private DrawRect(color: number) {
        const width = BuilderConfig.WorldCellWidth;

        if (!this.isInitialBlock) {
            this.view.lineStyle(2, 0x808080, 1);
            this.view.zIndex = 1;
        } else {
            this.view.lineStyle(2, color, 1);
            this.view.zIndex = 2;
        }

        this.view.beginFill(color);

        this.view.drawRect(0, 0, width, width);

        if (!this.isInitialBlock) {
            this.view.beginFill(0x808080, 0.3);
            this.view.drawRect(0, 0, width, width);
        }

        this.view.endFill();
    }

    public SetSize(size: number): void {
        this.size = size;
        this.view.scale.y = this.size;
    }

    // usado antes de aplicar o GSAP
    public SetOnlySize(size: number): void {
        this.size = size;
    }

    public GetSize(): number {
        return this.size;
    }

    public SetColor(color: number): void {
        this.color = color;
        this.DrawRect(color);
    }

    // usado pelo antes de aplicar o GSAP
    public SetOnlyColor(color: number): void {
        this.color = color;
    }

    public GetColor(): number {
        return this.color;
    }

    public SetPosition(x: number, y: number): void {
        this.view.position.set(x, y);
    }

    public GetPosition(): PIXI.Point {
        return this.view.position;
    }

    public Translate(x: number, y: number): void {
        this.view.position.x += x;
        this.view.position.y += y;
    }

    public GetView(): PIXI.Container {
        return this.view;
    }

    public Destroy(): void {
        this.view.destroy();
    }
}
