import gsap from "gsap";
import {NavTitleIds, PreloaderIds} from "../../enum/element_ids.ts";
import {textShuffleLight} from "../text/shuffle.ts";

export function PreloaderOnEnter() {
    const container = document.getElementById(PreloaderIds.container_top)!;
    const container_2 = document.getElementById(PreloaderIds.container_bottom)!;
    const tl = gsap.timeline();

    const nameTitle = document.getElementById(NavTitleIds.name)!
    const folioTitle = document.getElementById(NavTitleIds.folio)!

    textShuffleLight(nameTitle, "TRUNG. HA", null, 80);
    textShuffleLight(folioTitle, "folio .25", null, 80);

    tl.to(container, {
        delay: 0.3,
        y: "-100%",
        duration: 1.5,
        ease: "power2.out",
    }).to(
        container_2,
        {
            y: "100%",
            duration: 1.5,
            ease: "power2.out",
        },
        "<"
    );
}

export function PreloaderOnExit() {
    const container = document.getElementById(PreloaderIds.container_top)!;
    const container_2 = document.getElementById(PreloaderIds.container_bottom)!;

    const tl = gsap.timeline();

    const nameTitle = document.getElementById(NavTitleIds.name)!
    const folioTitle = document.getElementById(NavTitleIds.folio)!

    textShuffleLight(nameTitle, "loading", null, 80);
    textShuffleLight(folioTitle, "loading", null, 80);

    tl.to(container, {
        delay: 0.3,
        y: "0%",
        duration: 1.5,
        ease: "power2.out",
    }).to(
        container_2,
        {
            y: "0%",
            duration: 1.5,
            ease: "power2.out",
        },
        "<"
    );
}
