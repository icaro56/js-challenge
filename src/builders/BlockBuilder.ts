import { Block } from "../block/Block";
import { BlockJson } from "../level/LevelJson";
import { BuilderConfig } from "../builders/BuilderConfig";
import { Utils } from "../utils/Utils";

export class BlockBuilder {
    private blocks: Array<Block>;

    constructor() {
        this.blocks = new Array<Block>();
    }

    public CreateInitialBlock(bl: BlockJson): Block {
        const color = parseInt(bl.color.replace(/^#/, ""), 16);
        const block = new Block(bl.size, color, true);
        this.blocks.push(block);

        block.SetCellX(1);
        const pos = Utils.ConvertCellPosToPosition(block.GetCellX());
        block.SetPosition(pos.x, pos.y);

        return block;
    }

    public CreateFinalBlock(bl: BlockJson): Block {
        const color = parseInt(bl.color.replace(/^#/, ""), 16);
        const block = new Block(bl.size, color, false);
        this.blocks.push(block);

        block.SetCellX(BuilderConfig.NumWorldCells);
        const pos = Utils.ConvertCellPosToPosition(block.GetCellX());
        block.SetPosition(pos.x, pos.y);

        return block;
    }

    public DestroyBlocks(): void {
        this.blocks.length = 0;
    }

    public GetLength(): number {
        return this.blocks.length;
    }
}
