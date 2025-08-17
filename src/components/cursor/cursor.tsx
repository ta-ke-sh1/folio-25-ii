import {DeviceType} from "../../enum/system_state.ts";
import {useSystemStore} from "../../hooks/system_state.ts";

function MobileCursor() {
    return (
        <div></div>
    )
}

function WindowCursor() {
    return <div></div>
}

export default function Cursor() {
    const {deviceType} = useSystemStore()

    return deviceType === DeviceType.MOBILE ? <MobileCursor/> : <WindowCursor/>
}