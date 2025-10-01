import {useEffect} from "react";
import {PreloaderOnEnter} from "../../animations/preloader/preloader.ts";
import {ContainerBase} from "../../components/containers/container.base.tsx";

export default function PlaygroundLayout() {

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnEnter();
        }, 1000);
    }, []);

    {/*Main stack item*/}
    return (
        <ContainerBase>
        </ContainerBase>
    );
}
