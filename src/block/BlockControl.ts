import { Block } from "./Block";
import { LevelCells } from "../level/LevelCells";
import { EventEmitter } from "events";
import { Utils } from "../utils/Utils";

export class BlockControl extends EventEmitter {
    private block: Block | null;
    private readonly timerToNextUpdate: number;
    private timer: number;
    private reachTheFinalPosition: boolean;
    private isBeingModified: boolean;

    constructor() {
        super();
        this.block = null;
        this.timerToNextUpdate = 30;
        this.timer = 0;
        this.reachTheFinalPosition = false;
        this.isBeingModified = false;
    }

    public Reset() {
        this.block = null;
        this.timer = 0;
        this.reachTheFinalPosition = false;
        this.isBeingModified = false;
        this.removeAllListeners();
    }

    public GetBlock(): Block | null {
        return this.block;
    }

    public SetBlock(block: Block | null): void {
        this.block = block;
    }

    public Update(delta: number): void {
        if (this.block != null && !this.reachTheFinalPosition && !this.isBeingModified) {
            this.timer += delta;

            if (this.timer >= this.timerToNextUpdate) {
                this.block.TranslateCellX(1);
                const pos = Utils.ConvertCellPosToPosition(this.block.GetCellX());
                this.block.SetPosition(pos.x, pos.y);

                this.CheckBlockPosition();

                this.timer = 0;
            }
        }
    }

    private CheckBlockPosition() {
        if (this.block != null) {
            // tem algum modificador na posição?
            const posX = this.block?.GetCellX();
            if (LevelCells.GetInstance().HasModifierInPosition(posX)) {
                const modifier = LevelCells.GetInstance().GetModifier(posX);
                this.isBeingModified = true;
                modifier?.Apply(this.block, () => {
                    this.isBeingModified = false;
                });
            }
            // cheguei na posição final?
            else if (LevelCells.GetInstance().IsFinalPosition(posX)) {
                this.reachTheFinalPosition = true;
                this.emit("OnFinalPosition", this.block);
            }
        }
    }

    public TestEmitter() {
        this.block?.SetCellX(3);
        this.emit("OnFinalPosition", this.block);
    }
}
