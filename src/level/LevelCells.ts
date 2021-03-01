import { Modifier } from "../modifiers/Modifier";
import { BuilderConfig } from "../builders/BuilderConfig";

export class LevelCells {
    private static instance: LevelCells;

    private modifierCells = new Map<number, Modifier>();

    public static GetInstance(): LevelCells {
        if (!LevelCells.instance) {
            LevelCells.instance = new LevelCells();
        }

        return LevelCells.instance;
    }

    public AddModifier(position: number, modifier: Modifier): void {
        if (!this.modifierCells.has(position)) {
            this.modifierCells.set(position, modifier);
        }
    }

    public HasModifierInPosition(position: number): boolean {
        return this.modifierCells.has(position);
    }

    public GetModifier(position: number): Modifier | undefined {
        return this.modifierCells.get(position);
    }

    public IsFinalPosition(posX: number): boolean {
        return posX == BuilderConfig.NumWorldCells - 1;
    }

    public Clear(): void {
        this.modifierCells.clear();
    }
}
