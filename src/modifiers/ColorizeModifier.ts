import { Modifier } from "./Modifier";
import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";
import { BuilderConfig } from "../builders/BuilderConfig";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export class ColorizeModifier extends Modifier {
    private color: number;
    private view: PIXI.Graphics;

    constructor(color: number) {
        super(ModifierType.Colorize);

        this.color = color;

        this.view = new PIXI.Graphics();
        const width = BuilderConfig.WorldCellWidth;

        this.view.lineStyle(2, 0xffffff, 1);
        this.view.beginFill(color);
        this.view.drawRect(0, 0, width, width);
        this.view.endFill();

        this.SetupAnimations();
    }

    private SetupAnimations() {
        gsap.set(this.view, {
            pixi: {
                fillColor: 0xaaaaaa,
            },
        });

        gsap.to(this.view, {
            duration: 0.5,
            pixi: {
                fillColor: this.color,
            },
            repeat: -1,
            yoyo: true,
        });
    }

    public GetView(): PIXI.Container {
        return this.view;
    }

    public SetPosition(x: number, y: number): void {
        const newY = this.view.height / 2;
        const newX = this.view.width / 2;
        this.view.position.set(x - newX, y - newY);
    }

    public GetPosition(): PIXI.Point {
        return this.view.position;
    }

    SetColor(color: number): void {
        this.color = color;
    }

    GetColor(): number {
        return this.color;
    }

    public Apply(block: Block, onComplete: () => void): void {
        block.SetOnlyColor(this.color);

        gsap.to(block.GetView(), {
            duration: 1,
            pixi: {
                fillColor: this.color,
                lineColor: this.color,
            },
            onComplete: onComplete,
        });
    }

    public Destroy(): void {
        this.view.destroy();
    }
}
