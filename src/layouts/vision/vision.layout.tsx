import {useEffect} from "react";
import {PreloaderOnEnter} from "../../animations/preloader/preloader.ts";
import {ContainerBase} from "../../components/containers/container.base.tsx";

export default function VisionLayout() {

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnEnter();
        }, 0);
    }, []);

    return (
        <ContainerBase>
            <video
                className={"section"}
                muted
                loop
                autoPlay={true}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100dvw",
                    height: "100dvh",
                    objectFit: "cover",
                    objectPosition: "center",
                    zIndex: 0,
                }}
            >
                <source src={"/video-1.webm"} type="video/webm"/>
                Your browser does not support the video tag.
            </video>
        </ContainerBase>
    )
}