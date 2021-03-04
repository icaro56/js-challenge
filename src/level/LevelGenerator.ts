import { BlockJson, LevelJson, ModifierJson } from "./LevelJson";

export class LevelGenerator {
    private static numRandomLevelCreated = 0;
    private static colors = ["#ff0000", "#00ff00", "#0000ff"];

    // inclusive, inclusive
    private static RandomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public CreateNewRandomLevel(): LevelJson {
        const levelJson = {} as LevelJson;

        levelJson.name = this.GenerateRandomName();
        levelJson.initial = this.GenerateBlock();
        levelJson.final = this.GenerateBlock();
        levelJson.modifiers = this.GenerateModifiers(levelJson.initial, levelJson.final);

        return levelJson;
    }

    private GenerateRandomName(): string {
        LevelGenerator.numRandomLevelCreated++;
        return "Random Level " + LevelGenerator.numRandomLevelCreated.toString();
    }

    private GenerateBlock(): BlockJson {
        const blockJson = {} as BlockJson;

        blockJson.color = this.GenerateColor();
        blockJson.size = this.GenerateSize();

        return blockJson;
    }

    private GenerateColor(): string {
        const randomIndex = LevelGenerator.RandomIntFromInterval(0, LevelGenerator.colors.length - 1);
        return LevelGenerator.colors[randomIndex];
    }

    private GenerateSize(): number {
        const randomSize = LevelGenerator.RandomIntFromInterval(1, 2);
        return randomSize;
    }

    private GenerateModifiers(initialBlock: BlockJson, finalBlock: BlockJson): Array<ModifierJson> {
        const modifiers = new Array<ModifierJson>();

        const fistModifier = this.GenerateFirstModifier(initialBlock, finalBlock);
        const secondModifier = this.GenerateSecondModifier(initialBlock, finalBlock);

        const randomSort = LevelGenerator.RandomIntFromInterval(1, 2);
        if (randomSort == 1) {
            modifiers.push(fistModifier);
            modifiers.push(secondModifier);
        } else {
            modifiers.push(secondModifier);
            modifiers.push(fistModifier);
        }

        const createOneMore = LevelGenerator.RandomIntFromInterval(1, 10);
        // 30% de chance
        if (createOneMore <= 3) {
            const randomModifier = this.GenerateRandomModifier();

            const insertInInit = LevelGenerator.RandomIntFromInterval(0, 1);
            if (insertInInit == 0) modifiers.push(randomModifier);
            else modifiers.splice(0, 0, randomModifier);
        }

        return modifiers;
    }

    // Cria uma opção exclusiva para cor e uma para atrapalhar na escolha do tamanho
    private GenerateFirstModifier(initialBlock: BlockJson, finalBlock: BlockJson): ModifierJson {
        const modifier = {} as ModifierJson;

        modifier.type = "select";
        const colorModifier = {} as ModifierJson;
        colorModifier.type = "colorize";

        if (initialBlock.color != finalBlock.color) {
            colorModifier.color = finalBlock.color;
        } else {
            colorModifier.color = this.GenerateColor();
        }
        modifier.options = new Array<ModifierJson>();
        modifier.options.push(colorModifier);

        const sizeModifier = {} as ModifierJson;
        sizeModifier.type = "resize";
        sizeModifier.size = this.GenerateSize();
        modifier.options.push(sizeModifier);

        return modifier;
    }

    // Cria uma opção exclusiva para o tamanho e uma para atrapalhar na escolha do cor
    private GenerateSecondModifier(initialBlock: BlockJson, finalBlock: BlockJson): ModifierJson {
        const modifier = {} as ModifierJson;

        modifier.type = "select";
        const sizeModifier = {} as ModifierJson;
        sizeModifier.type = "resize";

        if (initialBlock.size != finalBlock.size) {
            sizeModifier.size = finalBlock.size;
        } else {
            sizeModifier.size = this.GenerateSize();
        }
        modifier.options = new Array<ModifierJson>();
        modifier.options.push(sizeModifier);

        const colorModifier = {} as ModifierJson;
        colorModifier.type = "colorize";
        colorModifier.color = this.GenerateColor();
        modifier.options.push(colorModifier);

        return modifier;
    }

    private GenerateRandomModifier(): ModifierJson {
        const modifier = {} as ModifierJson;

        modifier.type = "select";
        const sizeModifier = {} as ModifierJson;
        sizeModifier.type = "resize";
        sizeModifier.size = this.GenerateSize();
        modifier.options = new Array<ModifierJson>();
        modifier.options.push(sizeModifier);

        const colorModifier = {} as ModifierJson;
        colorModifier.type = "colorize";
        colorModifier.color = this.GenerateColor();
        modifier.options.push(colorModifier);

        return modifier;
    }
}
