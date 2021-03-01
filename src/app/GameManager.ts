import { LevelJson } from "../level/LevelJson";
import { LevelLine } from "../level/LevelLine";
import { BuilderConfig } from "../builders/BuilderConfig";
import { BlockBuilder } from "../builders/BlockBuilder";
import { ModifierBuilder } from "../builders/ModifierBuilder";
import { BlockControl } from "../block/BlockControl";
import { Modifier } from "../modifiers/Modifier";
import { LevelCells } from "../level/LevelCells";
import { Block } from "../block/Block";
import { Container } from "pixi.js";

export class GameManager {
    private levels: Array<LevelJson>;
    private currentLevelIndex: number;
    private levelLine: LevelLine | null;
    private blockBuilder: BlockBuilder;
    private modifierBuilder: ModifierBuilder;
    private blockControl: BlockControl;
    private finalBlock: Block | null;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.levels = new Array<LevelJson>();
        this.currentLevelIndex = 0;
        this.levelLine = null;
        this.blockBuilder = new BlockBuilder();
        this.modifierBuilder = new ModifierBuilder();
        this.blockControl = new BlockControl();
        this.finalBlock = null;
        this.stage = stage;
    }

    public Setup(levels: Array<LevelJson>): void {
        this.levels = levels;

        this.CreateNextLevel();
    }

    public CreateNextLevel(): void {
        const level = this.levels[this.currentLevelIndex];

        this.CreateLine();

        const block = this.blockBuilder.CreateInitialBlock(level.initial);

        this.finalBlock = this.blockBuilder.CreateFinalBlock(level.final);

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

        this.blockControl.SetBlock(null);
        this.blockBuilder.DestroyBlocks();

        this.modifierBuilder.DestroyModifiers();
    }

    private OnFinalPositionCallback(block: Block) {
        console.log("cheguei na posicao final");
        console.log(block);
    }

    private PopulateLevelCells(modifiers: Array<Modifier>): void {
        for (let i = 0; i < modifiers.length; i++) {
            const modifier = modifiers[i];

            LevelCells.GetInstance().AddModifier(modifier.GetX(), modifier);
        }
    }

    private CreateLine() {
        this.levelLine = new LevelLine(BuilderConfig.NumWorldCells);
        this.stage.addChild(this.levelLine.GetView());
    }

    private DestroyLine() {
        this.levelLine = null;
    }

    private Debug() {
        console.log(this.levels);
    }
}
