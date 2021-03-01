import { Block } from "./Block";
import { LevelCells } from "../level/LevelCells";
import { EventEmitter } from "events";

export class BlockControl extends EventEmitter {
    private block: Block | null;

    constructor() {
        super();
        this.block = null;
    }

    public GetBlock(): Block | null {
        return this.block;
    }

    public SetBlock(block: Block | null): void {
        this.block = block;
    }

    public Update(delta: number): void {
        if (this.block != null) {
            this.block.Update(delta);

            this.CheckBlockPosition();
        }
    }

    private CheckBlockPosition() {
        if (this.block != null) {
            // tem algum modificador na posição?
            const posX = this.block?.GetX();
            if (LevelCells.GetInstance().HasModifierInPosition(posX)) {
                const modifier = LevelCells.GetInstance().GetModifier(posX);
                modifier?.Apply(this.block);
            }
            // cheguei na posição final?
            else if (LevelCells.GetInstance().IsFinalPosition(this.block.GetX())) {
                this.emit("OnFinalPosition", this.block);
            }
        }
    }

    public TestEmitter() {
        this.block?.SetX(3);
        this.emit("OnFinalPosition", this.block);
    }
}
