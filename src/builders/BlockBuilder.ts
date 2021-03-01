import { Block } from "../block/Block";
import { BlockJson } from "../level/LevelJson";

export class BlockBuilder {
    private blocks: Array<Block>;

    constructor() {
        this.blocks = new Array<Block>();
    }

    public CreateInitialBlock(bl: BlockJson): Block {
        const color = parseInt(bl.color.replace(/^#/, ""), 16);
        const block = new Block(bl.size, color, true);
        this.blocks.push(block);

        return block;
    }

    public CreateFinalBlock(bl: BlockJson): Block {
        const color = parseInt(bl.color.replace(/^#/, ""), 16);
        const block = new Block(bl.size, color, false);
        this.blocks.push(block);

        return block;
    }

    public DestroyBlocks(): void {
        this.blocks.length = 0;
    }
}
