
export type Color = {
    min: number,
    max: number,
    color: string
}

export const toHexColor = (colorRanges: Array<Color>, target: number) => {
    const matchedRange = colorRanges.find(colorItem => {
        return target >= colorItem.min && target <= colorItem.max
    })

    if (!matchedRange) throw Error('The color range does not match');

    const hexColor = matchedRange.color;

    return hexColor
}