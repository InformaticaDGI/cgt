// import { EventEmitter, Events } from "../../redux/events/event-emitter";
//TODO js revisar estos eventos
export function MapClickDisabler({ children }: { children: React.ReactNode | React.ReactNode[] }) {

  const handleMapMouseClickState = (state: boolean) => {
    console.log(state)
    // EventEmitter.dispatch(Events.MAP_MOUSE_CLICK_STATE, { disabled: state })
  };

  return (
    <div
      onMouseLeave={() => handleMapMouseClickState(false)}
      onMouseEnter={() => handleMapMouseClickState(true)}
    >
      {children}
    </div>
  );
}