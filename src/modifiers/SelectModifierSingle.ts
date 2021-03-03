import { Modifier } from "./Modifier";
import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";
import { BuilderConfig } from "../builders/BuilderConfig";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export class SelectModifierSingle extends Modifier {
    private view: PIXI.Graphics;

    constructor() {
        super(ModifierType.Select);

        this.view = new PIXI.Graphics();
        const width = BuilderConfig.WorldCellWidth;

        this.view.lineStyle(2, 0xffffff, 1);
        this.view.beginFill(0x000000);
        this.view.drawRect(0, 0, width, width);
        this.view.endFill();
        this.view.interactive = true;

        // centralizando pivot
        const halfBlockWidth = BuilderConfig.WorldCellWidth / 2;
        this.view.pivot.x += halfBlockWidth;
        this.view.pivot.y += halfBlockWidth;

        this.SetupAnimations();
    }

    private SetupAnimations(): void {
        gsap.to(this.view, {
            pixi: {
                scale: 1.1,
            },
            duration: 0.5,
            ease: "steps(10)",
            repeat: -1,
            yoyo: true,
        });
    }

    public GetView(): PIXI.Container {
        return this.view;
    }

    public SetPosition(x: number, y: number): void {
        this.view.position.set(x, y);
    }

    public GetPosition(): PIXI.Point {
        return this.view.position;
    }

    public Apply(block: Block, onComplete: () => void): void {
        console.log("Clica em mim para mudar o modificador");
        onComplete();
    }

    public Destroy(): void {
        this.view.removeAllListeners();
        this.view.destroy();
    }
}
