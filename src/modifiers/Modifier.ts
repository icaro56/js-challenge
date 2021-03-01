import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";
import { GameObject } from "../basic/GameObject";

export abstract class Modifier extends GameObject {
    private type: ModifierType;

    constructor(type: ModifierType) {
        super();
        this.type = type;
    }

    public abstract Apply(block: Block): void;

    public GetType(): ModifierType {
        return this.type;
    }
}
