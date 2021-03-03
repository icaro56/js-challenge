import { LevelJson } from "./LevelJson";

export class LevelGenerator {
    private static randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}