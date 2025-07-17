import type { StatusInfo } from "../components/Ui/Badge/Badge"

export type Color = {
    min: number,
    max: number,
    color: string
}


export const TRANSFORMATIONS: Record<string, StatusInfo> = {
    "ebb9a497-9e97-40af-a7b7-47022184b755": "economy",
    "c6b20b7d-7878-4969-a2ec-a90a451b661a": "services",
    "8e9b8916-ab6d-45f7-ab5d-ff47951171ca": "security",
    "b8c1e048-0937-4847-872f-ae0005dbc3b6": "social",
    "fa3b578b-8d7d-4f52-ac81-716576a1d5c4": "policy",
    "4c927d8b-a97f-4103-b2ce-4302dd8c440e": "ecology"
}

export const toHexColor = (colorRanges: Array<Color>, target: number) => {
    const matchedRange = colorRanges.find(colorItem => {
        return target >= colorItem.min && target <= colorItem.max
    })

    if (!matchedRange) throw Error('The color range does not match');

    const hexColor = matchedRange.color;

    return hexColor
}