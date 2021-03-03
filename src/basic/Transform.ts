export interface Transform {
    SetPosition(x: number, y: number): void;
    GetPosition(): PIXI.Point;
}
