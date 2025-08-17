import {DeviceType, SystemState} from "../enum/system_state.ts";
import {create} from "zustand";

interface SystemStore {
    systemState: SystemState
    setSystemState: (state: SystemState) => void
    deviceType: DeviceType
    setDeviceType: (deviceType: DeviceType) => void
}

export const useSystemStore = create<SystemStore>((set) => ({
    systemState: SystemState.LOADING,
    setSystemState: (state) => set({systemState: state}),
    deviceType: DeviceType.DESKTOP,
    setDeviceType: (deviceType: DeviceType) => set({deviceType: deviceType}),
}))