import gsap from "gsap";
import {PreloaderIds} from "../../enum/element_ids.ts";

export function PreloaderOnEnter() {
    const container = document.getElementById(PreloaderIds.container)!
    const circleContainer = document.getElementById(PreloaderIds.circleContainer)!

    const circle_1 = document.getElementById(`${PreloaderIds.circle}-1`)!
    const circle_2 = document.getElementById(`${PreloaderIds.circle}-2`)!
    const circle_3 = document.getElementById(`${PreloaderIds.circle}-3`)!
    const circle_4 = document.getElementById(`${PreloaderIds.circle}-4`)!

    const duration = 2;
    const ease = 'power2.inOut'
    const tl = gsap.timeline()

    tl.to(circleContainer!, {
        rotate: '135deg',
        duration: duration,
        ease: ease
    }).to(circle_1, {
        top: '80px',
        duration: duration,
        ease: ease
    }, "<").to(circle_2, {
        top: '-80px',
        duration: duration,
        ease: ease
    }, "<").to(circle_3, {
        left: '80px',
        duration: duration,
        ease: ease
    }, "<").to(circle_4, {
        left: '-80px',
        duration: duration,
        ease: ease
    }, "<").to(container, {
        opacity: 0,
        delay: 1,
        duration: 1,
        ease: 'expo.out',
    },).to(container, {
        x: '100%',
        duration: 0,
    })
}