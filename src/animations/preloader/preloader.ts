import gsap from "gsap";
import {PreloaderIds} from "../../enum/element_ids.ts";

export function PreloaderOnExit(){

}

export function PreloaderOnEnter(){

    const circle_1 = document.getElementById(`${PreloaderIds.circle}-1`)!
    const circle_2 = document.getElementById(`${PreloaderIds.circle}-2`)!
    const circle_3 = document.getElementById(`${PreloaderIds.circle}-3`)!
    const circle_4 = document.getElementById(`${PreloaderIds.circle}-4`)!

    const duration = 1;
    const ease = 'power.3'
    const tl = gsap.timeline()
    tl.to(circle_1, {
        top: '150px',
        stagger: 0.1,
        duration: duration,
        ease: ease
    }).to(circle_2, {
        top: '-150px',
        stagger: 0.5,
        duration: duration,
        ease: ease
    }).to(circle_3, {
        left: '150px',
        stagger: 0.3,
        duration: duration,
        ease: ease
    }).to(circle_4, {
        left: '-150px',
        stagger: 0.7,
        duration: duration,
        ease: ease
    })
}