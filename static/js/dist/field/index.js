import { TileInner } from "./tile_inner.js";
import { TileOuter } from "./tile_outer.js";
export class Field {
    amountMines;
    onDefeat;
    onVictory;
    startGame;
    getMode;
    container;
    table;
    firstClickHappened;
    tiles;
    allTiles;
    constructor(stats, width, height, amountMines, onDefeat, onVictory, startGame, getMode) {
        this.amountMines = amountMines;
        this.onDefeat = onDefeat;
        this.onVictory = onVictory;
        this.startGame = startGame;
        this.getMode = getMode;
        this.container = document.getElementById("fieldContainer");
        this.table = document.createElement("table");
        this.container.appendChild(this.table);
        this.firstClickHappened = false;
        this.tiles = [];
        this.allTiles = [];
        this.createField(width, height, stats);
    }
    createField(width, height, stats) {
        const outer = new TileOuter();
        // Top row with outer elements:
        let row = [];
        this.allTiles.push(row);
        for (let i = 0; i < width + 2; i++) {
            row.push(outer);
        }
        // The middle rows, starting and ending with outer tiles and in the middle with inner tiles:
        for (let i = 0; i < height; i++) {
            row = [];
            this.allTiles.push(row);
            row.push(outer);
            const row2 = [];
            this.tiles.push(row2);
            const rowElement = document.createElement("tr");
            this.table.appendChild(rowElement);
            for (let j = 0; j < width; j++) {
                const cellElement = document.createElement("td");
                rowElement.appendChild(cellElement);
                const t = new TileInner(cellElement, outer, outer, outer, outer, this, stats);
                row.push(t);
                row2.push(t);
            }
            row.push(outer);
        }
        // Bottom row with outer elements:
        row = [];
        this.allTiles.push(row);
        for (let i = 0; i < width + 2; i++) {
            row.push(outer);
        }
        // Link the inner elements together:
        for (let r = 1; r < this.allTiles.length - 1; r++) {
            for (let c = 1; c < this.allTiles[r].length - 1; c++) {
                const el = this.allTiles[r][c];
                el.setTop(this.allTiles[r - 1][c]);
                el.setLeft(this.allTiles[r][c - 1]);
                el.setBottom(this.allTiles[r + 1][c]);
                el.setRight(this.allTiles[r][c + 1]);
            }
        }
    }
    /**
     * Sets the mines in the field and the numbers for the other tiles.
     * @param doNotSetToMines A list with tiles that may not be set to mines.
     */
    setTileContents(doNotSetToMines) {
        for (let i = 0; i < this.amountMines; i++) {
            const randomRow = this.tiles[Math.floor(Math.random() * this.tiles.length)];
            const randomTile = randomRow[Math.floor(Math.random() * randomRow.length)];
            // Tile may not be a mine:
            if (doNotSetToMines.includes(randomTile)) {
                i--;
                continue;
            }
            // If the tile is already a mine:
            if (!randomTile.placeMine()) {
                i--;
            }
        }
        // Set the numbers for the remaining tiles:
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].placeNumber();
            }
        }
    }
    /**
     * This function is always called when the user clicks on a tile.
     * But only when the first ever click on a tile is made something relevant happens: The field is initialized.
     * @param el The tile that was clicked.
     */
    onClick(el) {
        if (this.firstClickHappened) {
            return;
        }
        this.firstClickHappened = true;
        this.setTileContents(el.mayNotBeMine());
        this.startGame();
    }
    forceReveal() {
        for (const tileList of this.tiles) {
            for (const tile of tileList) {
                tile.forceReveal();
            }
        }
    }
    remove() {
        this.table.remove();
    }
}