import { Modifier } from "./Modifier";
import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";

export class ColorizeModifier extends Modifier {
    private color: number;

    constructor(color: number) {
        super(ModifierType.Colorize);

        this.color = color;
    }

    SetColor(color: number): void {
        this.color = color;
    }

    GetColor(): number {
        return this.color;
    }

    public Apply(block: Block): void {
        block.SetColor(this.color);
    }
}
