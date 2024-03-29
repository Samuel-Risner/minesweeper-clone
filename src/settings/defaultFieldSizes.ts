type Entries = {
    width: number;
    height: number;
    amountMines: number;
}

export const defaultFieldSizes: Entries[] = [
    {
        width: 8,
        height: 8,
        amountMines: 8
    },
    {
        width: 16,
        height: 16,
        amountMines: 32
    },
    {
        width: 32,
        height: 16,
        amountMines: 64
    }
]
