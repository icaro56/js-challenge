export abstract class GameObject {
    private x: number;
    private y: number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    public SetX(x: number): void {
        this.x = x;
    }

    public GetX(): number {
        return this.x;
    }

    public SetY(y: number): void {
        this.y = y;
    }

    public GetY(): number {
        return this.y;
    }

    public SetPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}
