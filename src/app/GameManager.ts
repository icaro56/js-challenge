import { LevelJson } from "../level/LevelJson";
import { LevelLine } from "../level/LevelLine";
import { BuilderConfig } from "../builders/BuilderConfig";
import { BlockBuilder } from "../builders/BlockBuilder";
import { ModifierBuilder } from "../builders/ModifierBuilder";
import { BlockControl } from "../block/BlockControl";
import { Modifier } from "../modifiers/Modifier";
import { LevelCells } from "../level/LevelCells";
import { Block } from "../block/Block";
import { ModifierType } from "../modifiers/ModifierType";
import { ColorizeModifier } from "../modifiers/ColorizeModifier";
import { ResizeModifier } from "../modifiers/ResizeModifier";
import { SelectModifier } from "../modifiers/SelectModifier";
import { LevelName } from "../level/LevelName";
import { LevelGenerator } from "../level//LevelGenerator";
import { Text, TextStyle } from "pixi.js";

export class GameManager {
    private levelsJson: Array<LevelJson>;
    private currentLevelIndex: number;
    private levelLine: LevelLine | null;
    private blockBuilder: BlockBuilder;
    private modifierBuilder: ModifierBuilder;
    private blockControl: BlockControl;
    private finalBlock: Block | null;
    private stage: PIXI.Container;
    private view: HTMLCanvasElement;
    private state: null | ((delta: number, elapsedMS: number) => void);
    private timerInMiliseconds: number;
    private levelName: LevelName;
    private LevelGenerator: LevelGenerator;
    private isHardCore: boolean;

    constructor(stage: PIXI.Container, view: HTMLCanvasElement) {
        this.levelsJson = new Array<LevelJson>();
        this.currentLevelIndex = 0;
        this.levelLine = null;
        this.blockBuilder = new BlockBuilder();
        this.modifierBuilder = new ModifierBuilder();
        this.blockControl = new BlockControl();
        this.finalBlock = null;
        this.stage = stage;
        this.view = view;
        this.state = null;

        this.stage.sortableChildren = true;
        this.timerInMiliseconds = 0;
        this.levelName = new LevelName();
        this.LevelGenerator = new LevelGenerator();
        this.isHardCore = false;
    }

    public Setup(levels: Array<LevelJson>): void {
        this.levelsJson = levels;

        this.timerInMiliseconds = 0;

        this.stage.addChild(this.levelName.GetView());

        this.CreateNextLevel();

        this.state = this.Playing;
    }

    public Update(delta: number, elapsedMS: number): void {
        if (this.state != null) {
            this.state(delta, elapsedMS);
        }
    }

    private Playing(delta: number, elapsedMS: number) {
        this.timerInMiliseconds += elapsedMS;
        this.blockControl.Update(delta);
    }

    public CreateNextLevel(): void {
        const level = this.levelsJson[this.currentLevelIndex];
        this.timerInMiliseconds = 0;

        this.ConfigureLevelName(level.name);

        this.CreateLine();

        const block = this.blockBuilder.CreateInitialBlock(level.initial);
        this.stage.addChild(block.GetView());

        this.finalBlock = this.blockBuilder.CreateFinalBlock(level.final);
        this.stage.addChild(this.finalBlock.GetView());

        this.modifierBuilder.CreateModifiers(level.modifiers);
        const modifiers = this.modifierBuilder.GetCreatedModifiers();

        this.PopulateLevelCells(modifiers);

        this.blockControl.SetBlock(block);

        this.blockControl.on("OnFinalPosition", (block: Block) => {
            this.OnFinalPositionCallback(block);
        });
    }

    public DestroyLevel(): void {
        this.DestroyLine();

        let block = this.blockControl.GetBlock();
        if (block) block.Destroy();

        this.blockControl.Reset();
        block = null;

        if (this.finalBlock) this.finalBlock.Destroy();

        this.finalBlock = null;

        this.blockBuilder.DestroyBlocks();

        this.modifierBuilder.DestroyModifiers();

        this.ClearLevelCells();
    }

    private OnFinalPositionCallback(block: Block) {
        //console.log("cheguei na posicao final");

        if (this.IsBlockEqualFinalBlock(block)) {
            console.log("Level Score: " + this.timerInMiliseconds);
            //console.log("blocos são iguais!");
            // Carrega a próxima fase se há mais fase senão dá Fim de Jogo
            if (this.HasNextLevel()) {
                this.LoadNextLevelProcedure();
            } else {
                this.GameOverProcedure();
            }
        } else {
            // Repete a mesma fase
            this.RestartLevelProcedure();
        }
    }

    private HasNextLevel(): boolean {
        return this.currentLevelIndex + 1 < this.levelsJson.length;
    }

    async LoadNextLevelProcedure(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.DestroyLevel();

        this.currentLevelIndex++;
        this.CreateNextLevel();
    }

    async RestartLevelProcedure(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.DestroyLevel();

        this.CreateNextLevel();
    }

    async GameOverProcedure(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!this.isHardCore) {
            console.log("Fim do jogo! Você venceu! Continue jogando as fases aleatórias");
            this.CreateHardcoreText();
            this.isHardCore = true;
        }

        this.GenerateNewLevel();

        this.DestroyLevel();
        this.currentLevelIndex++;
        this.CreateNextLevel();
    }

    private IsBlockEqualFinalBlock(block: Block): boolean {
        const isColorEqual = block.GetColor() == this.finalBlock?.GetColor();
        const isSizeEqual = block.GetSize() == this.finalBlock?.GetSize();

        return isColorEqual && isSizeEqual;
    }

    private PopulateLevelCells(modifiers: Array<Modifier>): void {
        for (let i = 0; i < modifiers.length; i++) {
            const modifier = modifiers[i];

            LevelCells.GetInstance().AddModifier(modifier.GetCellX(), modifier);

            switch (modifier.GetType()) {
                case ModifierType.Colorize:
                    this.stage.addChild((modifier as ColorizeModifier).GetView());
                    break;
                case ModifierType.Resize:
                    this.stage.addChild((modifier as ResizeModifier).GetView());
                    break;
                case ModifierType.Select:
                    const selectModifier = modifier as SelectModifier;

                    for (let i = 0; i < selectModifier.modifierList.length; i++) {
                        const optionModifier = selectModifier.modifierList[i];
                        this.stage.addChild(optionModifier.GetView());
                    }
                    break;
            }
        }
    }

    private ClearLevelCells(): void {
        LevelCells.GetInstance().Clear();
    }

    private ConfigureLevelName(name: string): void {
        this.levelName.SetName(name);

        const newX = this.view.width / 2;
        this.levelName.SetPosition(newX, 50);
    }

    private CreateLine() {
        this.levelLine = new LevelLine(BuilderConfig.NumWorldCells);

        this.levelLine.SetCenter(this.view.width / 2, this.view.height / 2);
        this.levelLine.SetWidth(BuilderConfig.NumWorldCells * BuilderConfig.WorldCellWidth);

        this.stage.addChild(this.levelLine.GetView());
    }

    private DestroyLine() {
        if (this.levelLine) this.levelLine.Destroy();

        this.levelLine = null;
    }

    private GenerateNewLevel(): void {
        const randomLevel = this.LevelGenerator.CreateNewRandomLevel();
        this.levelsJson.push(randomLevel);
    }

    private Debug() {
        console.log(this.levelsJson);
    }

    private CreateHardcoreText() {
        const hardcoreText = new Text("Modo Hardcore Ativado");
        hardcoreText.anchor.set(0.5);
        hardcoreText.x = this.view.width / 2;
        hardcoreText.y = this.view.height - 40;

        const s = new TextStyle();
        s.fill = 0xff0000;
        s.fontSize = 20;
        s.fontFamily = "Arial";
        hardcoreText.style = s;

        this.stage.addChild(hardcoreText);
    }
}
