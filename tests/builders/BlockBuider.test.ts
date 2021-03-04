import { BlockBuilder } from "../../src/builders/BlockBuilder";
import { BuilderConfig } from "../../src/builders/BuilderConfig";
import { BlockJson } from "../../src/level/LevelJson";
import { Utils } from "../../src/utils/Utils";

beforeEach(() => {
    Utils.view = document.createElement('canvas');
    Utils.view.width  = 600;
    Utils.view.height = 600;
  });

test("BlockBuilder->CreateInitialBlock", () => {
    const blockJson = {} as BlockJson;
    blockJson.size = 1;
    blockJson.color = "#ff0000";

    const blockBuilder = new BlockBuilder();

    const block = blockBuilder.CreateInitialBlock(blockJson);
    
    expect(1).toBe(block.GetCellX());
    expect(1).toBe(block.GetSize());
    expect(0xff0000).toBe(block.GetColor());
    expect(1).toBe(blockBuilder.GetLength());
});

test("BlockBuilder->CreateFinalBlock", () => {
    const blockJson = {} as BlockJson;
    blockJson.size = 2;
    blockJson.color = "#ffff00";

    const blockBuilder = new BlockBuilder();

    const block = blockBuilder.CreateFinalBlock(blockJson);
    
    expect(BuilderConfig.NumWorldCells).toBe(block.GetCellX());
    expect(2).toBe(block.GetSize());
    expect(0xffff00).toBe(block.GetColor());
    expect(1).toBe(blockBuilder.GetLength());
});

test("BlockBuilder->DestroyBlocks", () => {
    const blockJson = {} as BlockJson;
    blockJson.size = 2;
    blockJson.color = "#ffff00";

    const blockBuilder = new BlockBuilder();

    const block1 = blockBuilder.CreateInitialBlock(blockJson);
    const block2 = blockBuilder.CreateFinalBlock(blockJson);
    
    expect(2).toBe(blockBuilder.GetLength());

    blockBuilder.DestroyBlocks();
    expect(0).toBe(blockBuilder.GetLength());
});