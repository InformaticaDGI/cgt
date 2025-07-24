import type { Moment } from "moment";
import moment from "moment";
import { useEffect, useState } from "react";
import { TileLayer } from "react-leaflet";

export default function WeatherLayer() {
  const [rain, setRain] = useState<string>('')

  const loadTile = (date: Moment) => {
    setRain('')
    const year = date.clone().get('year')
    const month = date.clone().get('month') + 1
    const day = date.clone().get('date')
    const hour = date.clone().get('hour') - 1
    const minute = () => {
      const m = date.clone().get('minute')
      if (m > 30 && m <= 45) {
        return 45
      } else if (m > 0 && m <= 15) {
        return 0
      } else if (m > 15 && m <= 30) {
        return 15
      } else {
        return 30
      }
    }
    setRain(`https://sharaku.eorc.jaxa.jp/cgi-bin/trmm/GSMaP/tilemap/tile_rain.py?prod=rain&year=${year}&month=${month}&day=${day}&hour=${hour}&min=${minute()}&z={z}&x={x}&y={y}`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadTile(moment().utcOffset(-4))
    }, 1000 * 60)
    return () => clearInterval(interval)
  }, [rain])
  
  return <>
    <TileLayer url={rain} tileSize={256} />
  </>
}