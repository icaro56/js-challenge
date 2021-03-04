import { LevelLine } from "../../src/level/LevelLine";

test("LevelLine->SetWidth", () => {

    const levelLine = new LevelLine(10);
    
    expect(10).toBe(levelLine.GetWidth());

    levelLine.SetWidth(5);

    expect(5).toBe(levelLine.GetWidth());
});

test("LevelLine->SetColor", () => {

    const levelLine = new LevelLine(10);
    
    expect(0x808080).toBe(levelLine.GetColor());

    levelLine.SetColor(0xffffff);

    expect(0xffffff).toBe(levelLine.GetColor());
});