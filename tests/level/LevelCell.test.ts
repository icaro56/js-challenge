import { LevelCells } from "../../src/level/LevelCells";
//import { ColorizeModifier } from "../../src/modifiers/ColorizeModifier";
//import { ResizeModifier } from "../../src/modifiers/ResizeModifier";
import { ModifierType } from "../../src/modifiers/ModifierType";
import { Modifier } from "../../src/modifiers/Modifier";

test("LevelCells Teste Básico", () => {

    const levelCells = LevelCells.GetInstance();
    levelCells.AddModifier(1, {} as Modifier);
    levelCells.AddModifier(2, {} as Modifier);

    expect(true).toBe(levelCells.HasModifierInPosition(1));
    expect(true).toBe(levelCells.HasModifierInPosition(2));
    expect(false).toBe(levelCells.HasModifierInPosition(0));
    expect(false).toBe(levelCells.HasModifierInPosition(3));

    
    expect(true).toBe(levelCells.IsFinalPosition(11));
    expect(false).toBe(levelCells.IsFinalPosition(1));

    levelCells.Clear();
    const isEqual = levelCells.GetLength() == 0;
    expect(true).toBe(isEqual);
});