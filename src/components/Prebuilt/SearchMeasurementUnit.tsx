import axios from "axios"
import { InputSearch } from "../Ui/InputSearch/InputSearch"
import { config } from "../../config"

export const SearchMeasurementUnit = ({ onChange }: { onChange: (value: string) => void }) => {

    const getMeasurementUnits = async (q: string) => {
        const response = await axios.get(`${config.apiUrl}/measurements/search?q=${q}`)
        return response.data.map((measurementUnit: any) => ({
            value: measurementUnit.id,
            label: measurementUnit.name,
            subtext: measurementUnit.description
        })) as {
            value: string
            label: string,
            subtext?: string
        }[]
    }

    return <InputSearch searchFunction={getMeasurementUnits}
        onChange={(value) => {
            onChange(value)
        }} value={''} />
}