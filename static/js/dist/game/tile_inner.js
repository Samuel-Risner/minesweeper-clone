import { TileParent } from "./tile_parent.js";
export class TileInner extends TileParent {
    elementTop;
    elementLeft;
    elementBottom;
    elementRight;
    fieldElement;
    field;
    /**
     * `-1` -> mine;
     * `0` -> empty;
     * `1 to 8` -> corresponding numbers
     */
    mode;
    /**
     * `0` -> tile is not revealed; `1` -> there is a question mark on the tile; `2` -> there is a flag on the tile; `3` -> tile is revealed
     */
    revealed;
    displayElement;
    tileContentsElement;
    tileImageElement;
    constructor(elementTop, elementLeft, elementBottom, elementRight, fieldElement, field) {
        super();
        this.elementTop = elementTop;
        this.elementLeft = elementLeft;
        this.elementBottom = elementBottom;
        this.elementRight = elementRight;
        this.fieldElement = fieldElement;
        this.field = field;
        this.displayElement = document.createElement("button");
        this.tileContentsElement = document.createElement("div");
        this.tileImageElement = document.createElement("img");
        this._setupElements();
        this.mode = 0;
        this.revealed = 0;
    }
    _setupElements() {
        this.fieldElement.appendChild(this.displayElement);
        this.displayElement.appendChild(this.tileContentsElement);
        this.displayElement.className = "bg-neutral-500 w-10 aspect-square flex border-2 border-gray-400";
        this.tileContentsElement.className = "m-auto";
        this.tileContentsElement.hidden = true;
        this.displayElement.onclick = (ev) => {
            this.onClick(true);
        };
        this.displayElement.oncontextmenu = (ev) => {
            ev.preventDefault();
            this.onClick(false);
        };
    }
    setTop(el) {
        this.elementTop = el;
    }
    setLeft(el) {
        this.elementLeft = el;
    }
    setBottom(el) {
        this.elementBottom = el;
    }
    setRight(el) {
        this.elementRight = el;
    }
    /**
     * Sets the tile to be a mine, unless it already is a mine.
     * @returns `true` if the tile was set to contain a mine, `false` if it already contained a mine.
     */
    setMine() {
        if (this.mode === -1) {
            return false;
        }
        this.mode = -1;
        return true;
    }
    /**
     * @returns `1`: tile contains a mine; `0`: tile contains no mine.
     */
    isMine() {
        return this.mode === -1 ? 1 : 0;
    }
    spreadLeft() {
        this.elementLeft.spread();
    }
    spreadRight() {
        this.elementRight.spread();
    }
    spread() {
        // If the tile is already revealed or the tile contains a mine nothing happens.
        if ((this.revealed !== 0) || (this.mode === -1)) {
            return;
        }
        // If the tile contains a number its style is set.
        if (this.mode > 0) {
            this.setStyle();
        }
        this.revealed = 3;
        this.tileContentsElement.hidden = false;
        this.displayElement.className = "bg-neutral-300 w-10 aspect-square flex border-2 border-gray-400";
        this.elementTop.spread();
        this.elementLeft.spread();
        this.elementBottom.spread();
        this.elementRight.spread();
        this.elementBottom.spreadLeft();
        this.elementBottom.spreadRight();
        this.elementTop.spreadLeft();
        this.elementTop.spreadRight();
    }
    /**
     * Sets the colors for the tiles containing numbers.
     * Changes the background color of "this.displayElement" and the text color of "this.tileContentsElement".
     */
    setStyle() {
        this.displayElement.className = "bg-neutral-300 w-10 aspect-square flex border-2 border-gray-400";
        switch (this.mode) {
            case 1:
                this.tileContentsElement.className = "text-blue-500 m-auto text-xl";
                break;
            case 2:
                this.tileContentsElement.className = "text-green-500 m-auto text-xl";
                break;
            case 3:
                this.tileContentsElement.className = "text-red-500 m-auto text-xl";
                break;
            case 4:
                this.tileContentsElement.className = "text-purple-500 m-auto text-xl";
                break;
            case 5:
                this.tileContentsElement.className = "text-maroon-500 m-auto text-xl";
                break;
            case 6:
                this.tileContentsElement.className = "text-turquoise-500 m-auto text-xl";
                break;
            case 7:
                this.tileContentsElement.className = "text-black m-auto text-xl";
                break;
            case 8:
                this.tileContentsElement.className = "text-gray-500 m-auto text-xl";
                break;
        }
    }
    /**
     * When the tile is clicked.
     */
    onClick(leftClick) {
        // If this is the first ever tile being clicked the game needs further setup.
        this.field.onClick(this);
        // Show the tiles contents.
        this.tileContentsElement.hidden = false;
        switch (this.revealed) {
            case 0: // If the tile is not revealed yet:
                // If the tile should be revealed (the mode is in "reveal tile" and the user clicked with the left mouse button):
                if ((this.field.getMode() === 0) && leftClick) {
                    // Only do something when the tile is not revealed and nothing is on it:
                    if (this.revealed === 0) {
                        // If the tile is empty it is revealed with the adjacent tiles:
                        if (this.mode === 0) {
                            this.spread();
                        }
                        else {
                        }
                    }
                    // If a flag should be set (the mode is in "set flag" or the user clicked with the right mouse button):
                }
                else if ((this.field.getMode() === 1) || !leftClick) {
                    // If the tile is not revealed a flag is set:
                    if (this.revealed === 0) {
                        this.tileImageElement.src = "static/assets/1600x1600/flag.png";
                        this.tileImageElement.hidden = false;
                    }
                    alert("FLAG!");
                }
                break;
            case 1:
                break;
            case 2:
                break;
            case 3: // If the tile is already revealed nothing happens.
                break;
        }
        // // Nothing happens if the tile was already revealed.
        // if (this.revealed === 3) {
        //     return;
        // // When there is a question mark on the tile, it is removed.
        // } else if (this.revealed === 2) {
        //     this.tileImageElement.hidden = true;
        // // When there is a flag on the tile it is exchanged for a question mark.
        // } else if (this.revealed === 1) {
        //     this.tileImageElement.src = "static/assets/1600x1600/questionmark.png";
        // // When the tile is not revealed yet:
        // } else if (this.revealed === 0) {
        //     if (((this.field.getMode() === 0) && leftClick)) {
        //         console.log("Set flag!");
        //     }
        // }
        // // If this is the first ever tile being clicked the game needs further setup.
        // this.field.onClick(this);
        // // Show this tiles contents.
        // this.tileContentsElement.hidden = false;
    }
    amountMinesLeftRight() {
        return this.elementLeft.isMine() + this.elementRight.isMine();
    }
    setNumber() {
        if (this.mode === -1) {
            return;
        }
        this.mode = this.elementBottom.isMine() + this.elementLeft.isMine() + this.elementTop.isMine() + this.elementRight.isMine() + this.elementTop.amountMinesLeftRight() + this.elementBottom.amountMinesLeftRight();
        if (this.mode > 0) {
            this.tileContentsElement.textContent = String(this.mode);
        }
    }
    addSelf(els) {
        els.push(this);
    }
    addXAndSelfElements(els) {
        els.push(this);
        this.elementLeft.addSelf(els);
        this.elementRight.addSelf(els);
    }
    /**
     * Returns the tiles that may not set to be mines.
     * @returns A list with up to 9 tiles.
     */
    mayNotBeMine() {
        const toReturn = [this];
        this.elementTop.addXAndSelfElements(toReturn);
        this.elementLeft.addSelf(toReturn);
        this.elementBottom.addXAndSelfElements(toReturn);
        this.elementRight.addSelf(toReturn);
        return toReturn;
    }
}
