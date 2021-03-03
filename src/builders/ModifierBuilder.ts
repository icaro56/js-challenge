import { Modifier } from "../modifiers/Modifier";
import { ColorizeModifier } from "../modifiers/ColorizeModifier";
import { ResizeModifier } from "../modifiers/ResizeModifier";
import { SelectModifier } from "../modifiers/SelectModifier";
import { SelectModifierType } from "../modifiers/SelectModifierType";
import { BuilderConfig } from "./BuilderConfig";
import { ModifierJson } from "../level/LevelJson";
import { Utils } from "../utils/Utils";

export class ModifierBuilder {
    private createdModifiers: Array<Modifier>;

    constructor() {
        this.createdModifiers = new Array<Modifier>();
    }

    public CreateModifiers(modifiers: Array<ModifierJson>): void {
        if (modifiers.length > 0) {
            const startPosition = this.CalculateStartPosition(modifiers);

            for (let i = 0; i < modifiers.length; i++) {
                const modifierJson = modifiers[i];

                let modifier = null;

                if (modifierJson.type == "colorize") {
                    modifier = this.CreateColorizeModifier(modifierJson.color);
                } else if (modifierJson.type == "resize") {
                    modifier = this.CreateResizeModifier(modifierJson.size);
                } else if (modifierJson.type == "select") {
                    modifier = this.CreateSelectModifier(modifierJson.options);
                }

                if (modifier != null) {
                    this.SetupPosition(startPosition, modifier);
                    modifier.GetView().zIndex = 0;
                    this.createdModifiers.push(modifier);
                }
            }
        }
    }

    public DestroyModifiers(): void {
        for (let i = 0; i < this.createdModifiers.length; i++) {
            this.createdModifiers[i].Destroy();
        }
        this.createdModifiers.length = 0;
    }

    public GetCreatedModifiers(): Array<Modifier> {
        return this.createdModifiers;
    }

    private CreateColorizeModifier(color: string): ColorizeModifier {
        const colorNumber = parseInt(color.replace(/^#/, ""), 16);
        const modifier = new ColorizeModifier(colorNumber);

        return modifier;
    }

    private CreateResizeModifier(size: number): ResizeModifier {
        const modifier = new ResizeModifier(size);

        return modifier;
    }

    private CreateSelectModifier(options: Array<SelectModifierType>) {
        const modifier = new SelectModifier(options);

        return modifier;
    }

    private CalculateStartPosition(modifiers: Array<ModifierJson>): number {
        const numWorldCells = BuilderConfig.NumWorldCells;
        const modifiersLength = modifiers.length;

        return Math.floor(numWorldCells / (modifiersLength + 1)) + 1;
    }

    private CalculatePosition(startPosition: number): number {
        const modifiersSize = this.createdModifiers.length + 1;
        const positionX = startPosition * modifiersSize;

        return positionX;
    }

    private SetupPosition(startPosition: number, modifier: Modifier): void {
        const cellX = this.CalculatePosition(startPosition);

        modifier.SetCellX(cellX);

        const pos = Utils.ConvertCellPosToPosition(cellX);
        modifier.SetPosition(pos.x, pos.y);
    }
}
