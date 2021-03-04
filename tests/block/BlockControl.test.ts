import { BlockControl } from "../../src/block/BlockControl";
import { Block } from "../../src/block/Block";
import { BlockBuilder } from "../../src/builders/BlockBuilder";
import { BlockJson } from "../../src/level/LevelJson";
import { Utils } from "../../src/utils/Utils";
import { BuilderConfig } from "../../src/builders/BuilderConfig";

beforeEach(() => {
    Utils.view = document.createElement('canvas');
    Utils.view.width  = 600;
    Utils.view.height = 600;
  });
  
test("BlockControl->Update", () => {
    let blockControl = new BlockControl();
    const blockBuilder = new BlockBuilder();

    const blockJson = {} as BlockJson;
    blockJson.size = 1;
    blockJson.color = "#FF0000";

    let block = blockBuilder.CreateInitialBlock(blockJson);
    expect(block).toBeTruthy();

    blockControl.SetBlock(block);

    let block2 = blockControl.GetBlock();
    expect(block2).toBeTruthy()

    blockControl.Update(40);

    const isNull = (block2 == null);
    expect(false).toBe(isNull);

    expect(block2?.GetCellX()).toBe(2);
    
    for (let i = 3; i <= BuilderConfig.NumWorldCells; i++) {
        blockControl.Update(40);
        expect(block2?.GetCellX()).toBe(i);
    }

    expect(blockControl.IsReachTheFinalPosition()).toBe(true);
});