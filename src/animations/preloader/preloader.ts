import gsap from "gsap";
import {PreloaderIds} from "../../enum/element_ids.ts";

export function initPreloader() {
}

export function PreloaderOnFirstEntrance() {
    const container = document.getElementById(PreloaderIds.container)!;
    const container_2 = document.getElementById(PreloaderIds.container2)!;
    const tl = gsap.timeline();

    tl.to(container, {
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

export function PreloaderOnEnter() {
    const container = document.getElementById(PreloaderIds.container)!;
    const tl = gsap.timeline();

    tl.to(container, {
        filter: "blur(100px)",
        duration: 1.5,
        ease: "power2.out",
    }).to(container, {
        y: "-100%",
        duration: 0,
    });
}

export function PreloaderOnExit() {
    const container = document.getElementById(PreloaderIds.container)!;
    const container_2 = document.getElementById(PreloaderIds.container2)!;

    const tl = gsap.timeline();

    tl.to(container, {
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
