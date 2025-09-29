import type {FC} from "react";
import {useEffect} from "react";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {initPreloader, PreloaderOnFirstEntrance} from "../../animations/preloader/preloader.ts";
import {PreloaderIds} from "../../enum/element_ids.ts";

export const Preloader: FC = () => {
    useEffect(() => {
        initPreloader();
        setTimeout(() => {
            PreloaderOnFirstEntrance();
        }, 1000);
    }, []);

    return (
        <>
            <div
                id={PreloaderIds.container}
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100dvw",
                    height: "50dvh",
                    zIndex: ZIndexLevel.high + 2,
                    backgroundColor: "#0e0e0eff",
                    filter: "blur(0px)",
                    transition: "filter 0.3s ease",
                }}
            ></div>
            <div
                id={PreloaderIds.container2}
                style={{
                    position: "fixed",
                    left: 0,
                    top: "50dvh",
                    width: "100dvw",
                    height: "50dvh",
                    zIndex: ZIndexLevel.high + 2,
                    backgroundColor: "#0e0e0eff",
                    filter: "blur(0px)",
                    transition: "filter 0.3s ease",
                }}
            ></div>
        </>
    );
};
