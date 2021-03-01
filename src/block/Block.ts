import * as PIXI from "pixi.js";
import { GameObject } from "../basic/GameObject";

export class Block extends GameObject {
    private view: PIXI.Sprite;

    // altura em unidade de largura
    private size: number;
    private color: number;

    private velocityX: number;
    private velocityY: number;

    private isInitialBlock: boolean;

    constructor(size: number, color: number, isInitialBlock = true) {
        super();
        const resource = PIXI.Loader.shared.resources["arrow"];
        this.view = new PIXI.Sprite(resource.texture);
        this.view.anchor.set(0.5, 0.5);

        this.size = size;
        this.view.scale.y = this.size;

        this.color = color;

        this.velocityX = 0;
        this.velocityY = 0;

        this.isInitialBlock = isInitialBlock;
    }

    public SetSize(size: number): void {
        this.size = size;
        this.view.scale.y = this.size;
    }

    public GetSize(): number {
        return this.size;
    }

    public SetColor(color: number): void {
        this.color = color;
    }

    public GetColor(): number {
        return this.color;
    }

    public SetPosition(x: number, y: number): void {
        this.view.position.set(x, y);
    }

    public Translate(x: number, y: number): void {
        this.view.position.x += x;
        this.view.position.y += y;
    }

    public SetVelocity(velX: number, velY: number): void {
        this.velocityX = velX;
        this.velocityY = velY;
    }

    public GetView(): PIXI.Sprite {
        return this.view;
    }

    public Update(delta: number): void {
        this.view.position.x += this.velocityX /** delta*/;
        this.view.position.y += this.velocityY /** delta*/;
    }
}
