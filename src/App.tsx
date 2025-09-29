import {Route, Routes} from "react-router";
import {type ReactNode, useEffect} from "react";
import MemoriesLayout from "./layouts/memories/memories.layout.tsx";
import {useSystemStore} from "./hooks/system_state.ts";
import {DeviceType, SystemState} from "./enum/system_state.ts";
import ErrorLayout from "./layouts/error/error.layout.tsx";
import HomeLayout from "./layouts/home/home.layout.tsx";
import VisionLayout from "./layouts/vision/vision.layout.tsx";

interface RouteData {
    name: string;
    path: string;
    element: ReactNode
}

const routes: RouteData[] = [
    {
        name: "404",
        path: "*",
        element: <ErrorLayout/>
    },
    {
        name: "home",
        path: "/",
        element: <HomeLayout/>
    },
    {
        name: "memories",
        path: "/memories",
        element: <MemoriesLayout/>
    },
    {
        name: "vision",
        path: "/vision/:id",
        element: <VisionLayout/>
    },
]

function App() {

    const {setDeviceType, setSystemState} = useSystemStore()

    useEffect(() => {
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, []);

    function resizeHandler() {
        // window.location.reload()
    }

    useEffect(() => {
        const width = window.innerWidth;
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            setDeviceType(DeviceType.MOBILE)
        } else if (width < 700) {
            setDeviceType(DeviceType.MOBILE)
        } else {
            setDeviceType(DeviceType.DESKTOP)
        }
        setSystemState(SystemState.READY)
    }, [setDeviceType, setSystemState]);

    return (
        <Routes>
            {
                routes.map((route: RouteData, index) => <Route
                        key={`route-${index}-${route.name}`}
                        path={route.path}
                        element={route.element}
                    />
                )
            }
        </Routes>
    )
}

export default App
