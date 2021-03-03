import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export class Menu {
    private menuTexts: Array<PIXI.Text>;
    private stage: PIXI.Container;
    private view: HTMLCanvasElement;

    constructor(stage: PIXI.Container, view: HTMLCanvasElement) {
        this.menuTexts = new Array<PIXI.Text>();
        this.stage = stage;
        this.view = view;
    }

    public CreateChoseMenu(onClickFile: () => void, onClickApi: () => void) {
        const title = this.CreateText("Escolha a origem dos dados.", 50, 35, 0xffffff);
        this.stage.addChild(title);

        this.CreateOptionFileMenu(onClickFile);
        this.CreateOptionAPIMenu(onClickApi);

        this.menuTexts.push(title);
        this.menuTexts.push(title);
        this.menuTexts.push(title);
    }

    private CreateOptionFileMenu(onClickFile: () => void): void {
        const fileOption = this.CreateText("Ler do Arquivo", 200, 30, 0xff0000);

        fileOption.interactive = true;
        fileOption.buttonMode = true;

        fileOption.on("pointerup", () => {
            onClickFile();
        });

        fileOption.on("pointerover", () => {
            this.CreateAnimationToText(fileOption, 1.2);
        });

        fileOption.on("pointerout", () => {
            this.CreateAnimationToText(fileOption, 1);
        });

        this.stage.addChild(fileOption);
        this.menuTexts.push(fileOption);
    }

    private CreateOptionAPIMenu(onClickApi: () => void): void {
        const apiOption = this.CreateText("Ler da API", 300, 30, 0x4444ff);

        apiOption.interactive = true;
        apiOption.buttonMode = true;

        apiOption.on("pointerup", () => {
            onClickApi();
        });

        apiOption.on("pointerover", () => {
            this.CreateAnimationToText(apiOption, 1.2);
        });

        apiOption.on("pointerout", () => {
            this.CreateAnimationToText(apiOption, 1);
        });

        this.stage.addChild(apiOption);
        this.menuTexts.push(apiOption);
    }

    private CreateText(text: string, y: number, fontSize: number, color: number): PIXI.Text {
        const fileOption = new PIXI.Text(text);
        fileOption.anchor.set(0.5);
        fileOption.x = this.view.width / 2;
        fileOption.y = y;

        const s = new PIXI.TextStyle();
        s.fill = color;
        s.fontSize = fontSize;
        s.fontFamily = "Arial";
        fileOption.style = s;

        return fileOption;
    }

    private CreateAnimationToText(text: PIXI.Text, size: number): void {
        gsap.to(text, {
            pixi: {
                scale: size,
            },
            duration: 1,
        });
    }

    public DestroyChoseMenu() {
        for (let i = 0; i < this.menuTexts.length; i++) {
            this.menuTexts[i].removeAllListeners();
            this.stage.removeChild(this.menuTexts[i]);
        }

        this.menuTexts.length = 0;
    }
}
