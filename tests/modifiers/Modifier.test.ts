import { Utils } from "../../src/utils/Utils";
import { ColorizeModifier } from "../../src/modifiers/ColorizeModifier";
import { ResizeModifier } from "../../src/modifiers/ResizeModifier";
import { SelectModifier } from "../../src/modifiers/SelectModifier";
import { SelectModifierSingle } from "../../src/modifiers/SelectModifierSingle";
import { SelectModifierType } from "../../src/modifiers/SelectModifierType";
import { Block } from "../../src/block/Block";


beforeEach(() => {
    Utils.view = document.createElement('canvas');
    Utils.view.width  = 600;
    Utils.view.height = 600;
  });

test("Colorize Modifier Apply", () => {
    const modifier = new ColorizeModifier(0xff0000);
    const block = new Block(1, 0xffffff);

    modifier.Apply(block, () => {});

    expect(block.GetColor()).toBe(modifier.GetColor());
});

test("Resize Modifier Apply", () => {
    const modifier = new ResizeModifier(2);
    const block = new Block(1, 0xffffff);

    modifier.Apply(block, () => {});

    expect(block.GetSize()).toBe(modifier.GetSize());
});

test("Select Modifier Single Apply", () => {
    const modifier = new SelectModifierSingle();
    const block = new Block(1, 0xffffff);

    modifier.Apply(block, () => {});

    expect(block.GetSize()).toBe(1);
    expect(block.GetColor()).toBe(0xffffff);
});

test("Select Modifier Apply", () => {

    const options = new Array<SelectModifierType>();

    const colorModifier = {} as SelectModifierType;
    colorModifier.color = "#FF0000";
    colorModifier.type = "colorize";
    options.push(colorModifier);

    const resizeModifier = {} as SelectModifierType;
    resizeModifier.size = 2;
    resizeModifier.type = "resize";
    options.push(resizeModifier);

    const modifier = new SelectModifier(options);
    const block = new Block(1, 0xffffff);

    modifier.Apply(block, () => {});
    expect(block.GetSize()).toBe(1);
    expect(block.GetColor()).toBe(0xffffff);

    modifier.SelectModifier(0);
    modifier.Apply(block, () => {});
    expect(block.GetSize()).toBe(1);
    expect(block.GetColor()).toBe(0xffffff);

    modifier.SelectModifier(1);
    modifier.Apply(block, () => {});
    expect(block.GetSize()).toBe(1);
    expect(block.GetColor()).toBe(0xff0000);

    modifier.SelectModifier(2);
    modifier.Apply(block, () => {});
    expect(block.GetSize()).toBe(2);
    expect(block.GetColor()).toBe(0xff0000);
});