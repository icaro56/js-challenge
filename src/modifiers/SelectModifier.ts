import { Modifier } from "./Modifier";
import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";
import { ColorizeModifier } from "./ColorizeModifier";
import { ResizeModifier } from "./ResizeModifier";
import { SelectModifierType } from "./SelectModifierType";

export class SelectModifier extends Modifier {
    private modifierList: Array<Modifier>;
    private currentModifierIndex: number;

    constructor(options: Array<SelectModifierType>) {
        super(ModifierType.Select);

        this.currentModifierIndex = -1;

        this.modifierList = new Array<Modifier>();

        this.CreateModifierList(options);
    }

    public Apply(block: Block): void {
        if (this.currentModifierIndex != -1) {
            this.modifierList[this.currentModifierIndex].Apply(block);
        }
    }

    public SelectModifier(index: number): void {
        if (index < this.modifierList.length) {
            this.currentModifierIndex = index;
        }
    }

    public SelectModifierByType(type: ModifierType): void {
        this.currentModifierIndex = this.FindFirtIndexOfAType(type);
    }

    private FindFirtIndexOfAType(type: ModifierType): number {
        let foundIndex = -1;
        for (let i = 0; i < this.modifierList.length; i++) {
            if (this.modifierList[i].GetType() == type) {
                foundIndex = i;
                break;
            }
        }

        return foundIndex;
    }

    private CreateModifierList(options: Array<SelectModifierType>): void {
        for (let i = 0; i < options.length; i++) {
            if (options[i].type == "colorize") {
                const colorNumber = parseInt(options[i].color.replace(/^#/, ""), 16);
                const modifier = new ColorizeModifier(colorNumber);
                this.modifierList.push(modifier);
            } else if (options[i].type == "resize") {
                const modifier = new ResizeModifier(options[i].size);
                this.modifierList.push(modifier);
            }
        }
    }
}
