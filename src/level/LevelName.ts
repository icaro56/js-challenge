import { Text, TextStyle } from "pixi.js";
import { Transform } from "../basic/Transform";

export class LevelName implements Transform {
    private text: Text;

    constructor() {
        this.text = new Text("Bem-vindo ao Jogo");
        this.text.anchor.set(0.5);

        const s = new TextStyle();
        s.fill = 0xff0000;
        s.fontSize = 40;
        s.fontFamily = "Arial";

        this.text.style = s;
    }

    public SetPosition(x: number, y: number): void {
        this.text.x = x;
        this.text.y = y;
    }

    public GetPosition(): PIXI.Point {
        return this.text.position;
    }

    public SetName(name: string): void {
        this.text.text = name;
    }

    public GetName(): string {
        return this.text.text;
    }

    public GetView(): PIXI.Container {
        return this.text;
    }
}
