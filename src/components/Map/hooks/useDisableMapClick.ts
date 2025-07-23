import { useEffect, useState } from "react"
import { EventEmitter, Events } from "../../../redux/events/event-emitter"

export default function useDisableMapClick() {

  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  useEffect(() => {
    EventEmitter.subscribe(Events.MAP_MOUSE_CLICK_STATE, (state: { disabled: boolean }) => {
      setIsDisabled(state.disabled)
    })
    return () => {
      EventEmitter.unsubscribe(Events.MAP_MOUSE_CLICK_STATE)
    }
  }, [])

  return isDisabled

}