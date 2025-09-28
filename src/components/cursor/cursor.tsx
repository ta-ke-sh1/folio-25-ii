import {DeviceType} from "../../enum/system_state.ts";
import {useSystemStore} from "../../hooks/system_state.ts";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {useEffect, useRef} from "react";
import gsap from "gsap";

export enum CursorTexts {
    default = "[🙋‍♂️ TRUNG. HA]",
    insta = "[❤️ DROP A FOLLOW]",
    facebook = "[👬 WANNA BE FRIENDS?]",
    phone = "[📞 UNAVAILABLE AFTER 6]",
    email = "[✉️ SOMETHING FORMAL?]",
    access = "[👆 ACCESS]",
    selectMemory = "[👆 SELECT MEMORY ITEM]",
    clickPlay = "[👆 Click to Play]"
}

export function updateCursorText(text: CursorTexts) {
    const cursorElement = document.getElementById('cursor-helperText')!
    cursorElement.innerHTML = text
}

export default function Cursor() {
    const cursorSize = 6
    const easeType = "power3"
    const mouseDuration = 0.6

    const {deviceType, systemState} = useSystemStore()

    // Cursor ref list
    const cursorRef = useRef<HTMLDivElement>(null);

    // Instantiate cursor events
    useEffect(() => {
        if (deviceType === DeviceType.MOBILE) {
            return
        }

        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2

        gsap.set(cursorRef.current, {
            x: centerX - cursorSize / 2,
            y: centerY - cursorSize / 2,
            duration: 0
        })

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }

    }, [systemState, deviceType])

    function handleMouseMove(event: MouseEvent) {
        // Move both x & y if cursor has not reached navigation bar yet
        gsap.to(cursorRef.current, {
            x: event.clientX - cursorSize / 2,
            y: event.clientY - cursorSize / 2,
            duration: mouseDuration,
            ease: easeType,
        })
    }

    return <div>
        {/*Cursor item*/}
        {
            deviceType === DeviceType.DESKTOP && <div ref={cursorRef} style={{
                position: "fixed",
                backgroundColor: '#e03131',
                pointerEvents: 'none',
                height: `${cursorSize}px`,
                width: `${cursorSize}px`,
                transform: `translate(${cursorSize}px, ${cursorSize}px)`,
                zIndex: ZIndexLevel.highest,
                mixBlendMode: 'difference',
            }}>
                <div style={{position: 'relative', width: '400px'}}>
                    <div id={'cursor-helperText'} style={{
                        position: 'absolute',
                        top: -25,
                        left: 12,
                        color: 'white',
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}>
                        [🙋‍♂️ TRUNG. HA]
                    </div>
                </div>
            </div>
        }
    </div>
}