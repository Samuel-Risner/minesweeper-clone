import { settings } from "../settings.js";

export class SelectFieldSizeMenu {
    
    private menuElement: HTMLDivElement;

    private selectSizeContainer: HTMLDivElement;
    /**
     * width, height, amount mines
     */
    private fieldSizes: [number, number, number][];

    private goToSelectCustomSizeButton: HTMLButtonElement;
    private selectCustomSizeElement: HTMLDivElement;
    private confirmCustomSizeButton: HTMLButtonElement;

    private inputWidthElement: HTMLInputElement;
    private inputHeightElement: HTMLInputElement;
    private inputAmountMinesElement: HTMLInputElement;

    constructor() {
        this.menuElement = document.getElementById("selectFieldSizeMenu") as HTMLDivElement;

        this.selectSizeContainer = document.getElementById("selectSizeContainer") as HTMLDivElement;
        this.fieldSizes = [
            [8, 8, 8],
            [16, 16, 32],
            [32, 16, 64]
        ];
        this._createSelectSizeButtons();

        this.goToSelectCustomSizeButton = document.getElementById("goToSelectCustomSize") as HTMLButtonElement;
        this.goToSelectCustomSizeButton.onclick = () => {
            this.goToSelectCustomSizeButton.hidden = true;
            this.selectCustomSizeElement.hidden = false;
        }
        this.selectCustomSizeElement = document.getElementById("selectCustomSize") as HTMLDivElement;
        this.confirmCustomSizeButton = document.getElementById("selectCustomSizeConfirm") as HTMLButtonElement;
        this.confirmCustomSizeButton.onclick = () => {
            const width = Number(this.inputWidthElement.value);
            const height = Number(this.inputHeightElement.value);
            const amountMines = Number(this.inputAmountMinesElement.value);

            if ((width < settings.field.minWidth) || (width > settings.field.maxWidth)) {
                return;
            }
            if ((height < settings.field.minHeight) || (height > settings.field.maxHeight)) {
                return;
            }
            if ((amountMines < settings.field.minAmountMines) || (amountMines > settings.field.maxAmountMines)) {
                return;
            }
            if (!(width && height && amountMines)) {
                return;
            }
            if (amountMines >= (width * height)) {
                return;
            }
        }

        this.inputWidthElement = document.getElementById("inputWidth") as HTMLInputElement;
        this.inputHeightElement = document.getElementById("inputHeight") as HTMLInputElement;
        this.inputAmountMinesElement = document.getElementById("inputAmountMines") as HTMLInputElement;
        this.inputWidthElement.min = String(settings.field.minWidth);
        this.inputHeightElement.min = String(settings.field.minHeight);
        this.inputAmountMinesElement.min = String(settings.field.minAmountMines);
        this.inputWidthElement.max = String(settings.field.maxWidth);
        this.inputHeightElement.max = String(settings.field.maxHeight);
        this.inputAmountMinesElement.max = String(settings.field.maxAmountMines);
    }

    private _createSelectSizeButtons() {
        for (let i = 0; i < this.fieldSizes.length; i++) {
            const button = document.createElement("button");
            const div = document.createElement("div");

            button.className = "w-full aspect-square border-8";

            div.textContent = `${this.fieldSizes[i][0]}x${this.fieldSizes[i][1]}\nMines: ${this.fieldSizes[i][2]}`;
            div.className = "m-auto whitespace-pre-line";

            button.appendChild(div);
            this.selectSizeContainer.appendChild(button);
        }
    }

    hide() {
        this.menuElement.hidden = true;
    }

    show() {
        this.menuElement.hidden = false;
    }

}
