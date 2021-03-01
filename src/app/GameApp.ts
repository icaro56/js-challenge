import * as PIXI from "pixi.js";
import { Block } from "../block/Block";
import { GameManager } from "./GameManager";

export class GameApp {
    private app: PIXI.Application;
    public Stage: PIXI.Container;
    public View: HTMLCanvasElement;
    private gameWidth: number;
    private gameHeight: number;
    private timer: number;
    private box!: Block;
    private gameManager: GameManager;

    constructor(parent: HTMLElement, width: number, height: number) {
        this.app = new PIXI.Application({
            width,
            height,
            backgroundColor: 0x000000,
            transparent: true,
            resolution: 1,
            antialias: true,
            //resizeTo: window,
        });

        this.Stage = this.app.stage;
        this.View = this.app.view;

        this.gameWidth = width;
        this.gameHeight = height;

        this.timer = 0;

        parent.appendChild(this.View);

        this.gameManager = new GameManager(this.app.stage);
    }

    public async LoadGameAssets(): Promise<void> {
        return new Promise((resolve, reject) => {
            const loader = PIXI.Loader.shared;
            loader.baseUrl = "assets";
            loader.add("arrow", "over.png");
            loader.add("levels", "levels.json");

            loader.onComplete.once(() => {
                resolve();
            });

            loader.onError.once(() => {
                reject();
            });

            loader.onProgress.add(this.LoadProgressHandler);

            loader.load();
        });
    }

    private LoadProgressHandler(loader: PIXI.Loader, resource: PIXI.LoaderResource) {
        //Display the file `url` currently being loaded
        console.log("loading: " + resource.url);

        //Display the percentage of files currently loaded
        console.log("progress: " + loader.progress + "%");
    }

    public resizeCanvas(): void {
        const resize = () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
            this.Stage.scale.x = window.innerWidth / this.gameWidth;
            this.Stage.scale.y = window.innerHeight / this.gameHeight;
        };

        resize();

        window.addEventListener("resize", resize);
    }

    public GameWidth(): number {
        return this.gameWidth;
    }

    public GameHeight(): number {
        return this.gameHeight;
    }

    public SetupGame(): void {
        this.resizeCanvas();

        // depois adicionar a forma que utiliza o WebService também
        const levels = PIXI.Loader.shared.resources["levels"].data;
        this.gameManager.Setup(levels);

        this.app.ticker.add((delta) => this.GameLoop(delta));
    }

    private GameLoop(delta: number): void {
        this.timer += delta;
    }
}
