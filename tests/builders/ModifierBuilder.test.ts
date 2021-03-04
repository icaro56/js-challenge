import { ModifierBuilder } from "../../src/builders/ModifierBuilder";
import { ModifierJson } from "../../src/level/LevelJson";
import { Utils } from "../../src/utils/Utils";

beforeEach(() => {
    Utils.view = document.createElement('canvas');
    Utils.view.width  = 600;
    Utils.view.height = 600;
  });
  
test("ModifierBuilder->CreateModifiers", () => {

    const modifierBuilder = new ModifierBuilder();

    const modifiers = new Array<ModifierJson>();
    
    const modifier = {} as ModifierJson;
    modifier.color = "#FF0000";
    modifier.type = "colorize";

    modifiers.push(modifier);

    const modifier2 = {} as ModifierJson;
    modifier2.size = 2
    modifier2.type = "resize";

    modifiers.push(modifier2);

    modifierBuilder.CreateModifiers(modifiers);

    expect(modifierBuilder.GetCreatedModifiers().length).toBe(2);
});