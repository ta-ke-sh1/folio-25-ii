import {Container, Grid} from "@mantine/core";
import {useEffect} from "react";
import {PreloaderOnFirstEntrance} from "../../animations/preloader/preloader.ts";

export default function VisionLayout() {

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnFirstEntrance();
        }, 0);
    }, []);

    return (
        <Container fluid style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: 'black'
        }}>
            <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}>
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
            </div>
        </Container>
    )
}