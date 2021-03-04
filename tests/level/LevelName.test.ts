import { LevelName } from "../../src/level/LevelName";

test("LevelName->SetName", () => {

    const levelName = new LevelName();
    
    expect("Bem-vindo ao Jogo").toBe(levelName.GetName());

    const expectedName = "Testando 123";
    levelName.SetName(expectedName);

    expect(expectedName).toBe(levelName.GetName());
});

test("LevelName->SetPosition", () => {

    const levelName = new LevelName();

    levelName.SetPosition(10, 100);

    const pos = levelName.GetPosition();
    expect(10).toBe(pos.x);
    expect(100).toBe(pos.y);
});