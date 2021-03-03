import { Container } from "pixi.js";

export abstract class CellObject {
    private cellX: number;

    constructor() {
        this.cellX = 0;
    }

    public SetCellX(x: number): void {
        this.cellX = x;
    }

    public GetCellX(): number {
        return this.cellX;
    }

    public TranslateCellX(x = 1): void {
        this.cellX += x;
    }

    abstract GetView(): Container;

    abstract Destroy(): void;
}
