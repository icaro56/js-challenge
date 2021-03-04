import * as PIXI from "pixi.js";
import { Modifier } from "./Modifier";
import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";
import { Utils } from "../utils/Utils";
import { gsap } from "gsap";

export class ResizeModifier extends Modifier {
    private size: number;
    private view: PIXI.Sprite;

    constructor(size: number) {
        super(ModifierType.Resize);

        this.size = size;

        const resourceName = size > 1 ? "growing" : "decreasing";
        let texture;

        if (PIXI.Loader.shared.resources[resourceName] != undefined) {
            texture = PIXI.Loader.shared.resources[resourceName].texture;
            this.view = new PIXI.Sprite(texture);
        } else {
            const completeName = "assets/" + resourceName + ".png";
            this.view = PIXI.Sprite.from(completeName);
        }

        this.view.anchor.set(0.5);

        this.SetupAnimations();
    }

    private SetupAnimations(): void {
        let goalScale = 1;
        if (this.size > 1) {
            goalScale = 1.3;
        } else {
            goalScale = 0.7;
        }

        gsap.to(this.view, {
            pixi: {
                scaleY: goalScale,
            },
            duration: 1,
            ease: "steps(10)",
            repeat: -1,
            yoyo: true,
        });
    }

    public GetView(): PIXI.Container {
        return this.view;
    }

    SetPosition(x: number, y: number): void {
        this.view.position.x = x;
        this.view.position.y = y;
    }

    GetPosition(): PIXI.Point {
        return this.view.position;
    }

    SetSize(size: number): void {
        this.size = size;
    }

    GetSize(): number {
        return this.size;
    }

    public Apply(block: Block, onComplete: () => void): void {
        block.SetOnlySize(this.size);

        const cell = this.GetCellX();
        const pos = Utils.ConvertCellPosToPosition(cell);
        block.SetPosition(pos.x, pos.y);

        gsap.to(block.GetView(), {
            pixi: {
                scaleY: this.size,
            },
            duration: 1,
            ease: "steps(10)",
            onComplete: onComplete,
        });
    }

    public Destroy(): void {
        this.view.destroy();
    }
}
