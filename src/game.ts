import { Field } from "./game/field.js";

export class Game {
    
    private field: Field;

    constructor() {
        this.field = new Field(0, 0, 0);
    }
}
