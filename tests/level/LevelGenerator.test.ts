import { LevelGenerator } from "../../src/level/LevelGenerator";

test("LevelGenerator->CreateNewRandomLevel", () => {

    const levelCells = new LevelGenerator();
    
    const level1 = levelCells.CreateNewRandomLevel();
    const level2 = levelCells.CreateNewRandomLevel();
    
    expect(true).toBe(level1.name != "");
    expect(true).toBe(level2.name != "");

    const isEqual = level1 == level2;
    expect(false).toBe(isEqual);

    expect(true).toBe(level1.name != level2.name);
});