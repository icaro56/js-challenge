import { Modifier } from "./Modifier";
import { ModifierType } from "./ModifierType";
import { Block } from "../block/Block";
import { ColorizeModifier } from "./ColorizeModifier";
import { ResizeModifier } from "./ResizeModifier";
import { SelectModifierSingle } from "./SelectModifierSingle";
import { SelectModifierType } from "./SelectModifierType";
import { BuilderConfig } from "../builders/BuilderConfig";
import * as PIXI from "pixi.js";
import { CellObject } from "../basic/CellObject";

export class SelectModifier extends Modifier {
    public modifierList: Array<Modifier>;
    private currentModifierIndex: number;

    constructor(options: Array<SelectModifierType>) {
        super(ModifierType.Select);

        this.currentModifierIndex = 0;

        this.modifierList = new Array<Modifier>();

        this.CreateModifierList(options);

        this.AddEventInOptionModifiers();
    }

    private AddEventInOptionModifiers() {
        for (let i = 0; i < this.modifierList.length; i++) {
            const modifier = this.modifierList[i];
            modifier.GetView().on("pointerup", (e: PointerEvent) => {
                this.OnPointerUp(e);
            });
        }
    }

    private RemoveEventInOptionModifiers() {
        for (let i = 0; i < this.modifierList.length; i++) {
            const modifier = this.modifierList[i];
            modifier.GetView().removeAllListeners();
        }
    }

    private OnPointerUp(e: PointerEvent) {
        this.GetView().visible = false;

        const index = (this.currentModifierIndex + 1) % this.modifierList.length;
        this.currentModifierIndex = index;

        this.GetView().visible = true;
    }

    public GetView(): PIXI.Container {
        return this.modifierList[this.currentModifierIndex].GetView();
    }

    public SetPosition(x: number, y: number): void {
        for (let i = 0; i < this.modifierList.length; i++) {
            const modifier = this.modifierList[i];
            modifier.SetPosition(x, y);
        }
    }

    public GetPosition(): PIXI.Point {
        return this.GetView().position;
    }

    public SetCellX(x: number): void {
        super.SetCellX(x);

        for (let i = 0; i < this.modifierList.length; i++) {
            const modifier = this.modifierList[i];
            modifier.SetCellX(x);
        }
    }

    public Apply(block: Block, onComplete: () => void): void {
        this.modifierList[this.currentModifierIndex].Apply(block, onComplete);
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
        const selectSingle = new SelectModifierSingle();
        selectSingle.GetView().interactive = true;
        this.modifierList.push(selectSingle);

        for (let i = 0; i < options.length; i++) {
            if (options[i].type == "colorize") {
                const colorNumber = parseInt(options[i].color.replace(/^#/, ""), 16);
                const modifier = new ColorizeModifier(colorNumber);
                modifier.GetView().visible = false;
                modifier.GetView().interactive = true;
                this.modifierList.push(modifier);
            } else if (options[i].type == "resize") {
                const modifier = new ResizeModifier(options[i].size);
                modifier.GetView().visible = false;
                this.modifierList.push(modifier);
                modifier.GetView().interactive = true;
            }
        }
    }

    public Destroy(): void {
        this.RemoveEventInOptionModifiers();

        for (let i = 0; i < this.modifierList.length; i++) {
            const modifier = this.modifierList[i];
            modifier.Destroy();
        }

        this.modifierList.length = 0;
    }
}
