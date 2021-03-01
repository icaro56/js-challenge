export interface BlockJson {
    size: number;
    color: string;
}

export interface ModifierJson {
    type: string;
    size: number;
    color: string;
    options: Array<ModifierJson>;
}

export interface LevelJson {
    name: string;
    initial: BlockJson;
    final: BlockJson;
    modifiers: Array<ModifierJson>;
}
