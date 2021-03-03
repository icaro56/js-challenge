import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";
import { CellObject } from "../basic/CellObject";
import { Transform } from "../basic/Transform";

export abstract class Modifier extends CellObject implements Transform {
    private type: ModifierType;

    constructor(type: ModifierType) {
        super();
        this.type = type;
    }

    public abstract Apply(block: Block, onComplete: () => void): void;

    public GetType(): ModifierType {
        return this.type;
    }

    public SetPosition(x: number, y: number): void {
        this.GetView().position.set(x, y);
    }

    public GetPosition(): PIXI.Point {
        return new PIXI.Point(0, 0);
    }

    public abstract Destroy(): void;

    public abstract GetView(): PIXI.Container;
}
