import {useEffect} from "react";
import {PreloaderOnEnter} from "../../animations/preloader/preloader.ts";
import {ContainerBase} from "../../components/containers/container.base.tsx";
import CenterTitle from "../../components/containers/title/center.title.tsx";

export default function PlaygroundLayout() {

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnEnter();
        }, 1000);
    }, []);

    return (
        <ContainerBase>
            <CenterTitle title={"where a boring developer plays"}/>
        </ContainerBase>
    );
}
