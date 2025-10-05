import PrismaticBurst from "../../components/backgrounds/prismatic/prismatic.tsx";
import "./styles/home.scss";
import {mainColors} from "../../enum/colors.ts";
import {useEffect} from "react";
import {PreloaderOnEnter} from "../../animations/preloader/preloader.ts";
import {ContainerBase} from "../../components/containers/container.base.tsx";
import CenterTitle from "../../components/containers/title/center.title.tsx";

export default function HomeLayout() {

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnEnter();
        }, 1000);
    }, [])

    return (
        <ContainerBase>
            {/*Hero text*/}
            <CenterTitle title={"where a boring developer escapes"}/>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    backgroundColor: "black",
                }}
            >
                <PrismaticBurst colors={mainColors} animationType="hover" intensity={5} speed={0.8} distort={5}
                                hoverDampness={0.25} rayCount={12} mixBlendMode="lighten"/>
            </div>
        </ContainerBase>
    );
}
