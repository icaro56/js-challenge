import { Modifier } from "./Modifier";
import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";

export class ResizeModifier extends Modifier {
    private size: number;

    constructor(size: number) {
        super(ModifierType.Resize);

        this.size = size;
    }

    SetSize(size: number): void {
        this.size = size;
    }

    GetSize(): number {
        return this.size;
    }

    public Apply(block: Block): void {
        block.SetSize(this.size);
    }
}
