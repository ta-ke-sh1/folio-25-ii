import {Stack, Text} from "@mantine/core";
import {timestamp_log} from "../../utils/log.ts";
import gsap from "gsap";
import {useEffect, useRef} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {HeaderHeight} from "../../enum/sizing.ts";
import StringTune from "@fiddle-digital/string-tune";
import Contact from "../contact/contact.layout.tsx";
import type {VideoDetails} from "./types/home.types.ts";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {textShuffleLight} from "../../animations/text/shuffle.ts";

gsap.registerPlugin(ScrollTrigger)

// Configure smooth scroll
const stringTune = StringTune.getInstance();
stringTune.start(60); // Start with 60 FPS

const videoLists: VideoDetails[] = [
    {
        id: 1,
        url: "/video-1.webm",
        date: "Aug. 2025",
        title: "Summer Memories - Pt 3",
        link: "https://www.instagram.com/p/DNTMmoqz2EN/"
    },
    {
        id: 2,
        url: "/video-2.webm",
        date: "Jul. 2025",
        title: "Summer Memories - Pt 2",
        link: "https://www.instagram.com/p/DNBTitOTlEB/"
    },
    {
        id: 3,
        url: "/video-3.webm",
        date: "Jun. 2025",
        title: "Summer Memories - Pt 1",
        link: "https://www.instagram.com/p/DK91viVT6Hv/"
    }
]

export default function Homepage() {

    // Cursor ref list
    const cursorRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const verticalRef = useRef<HTMLDivElement>(null);

    // Title ref list
    const titleRef = useRef<HTMLDivElement>(null)
    const dateRef = useRef<HTMLDivElement>(null)

    const {systemState} = useSystemStore()

    const cursorSize = 6
    const easeType = "power3"
    const mouseDuration = 0.6

    // Instantiate cursor events
    useEffect(() => {
        timestamp_log('re-render cursor');

        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2

        gsap.set(cursorRef.current, {
            x: centerX - cursorSize / 2,
            y: centerY - cursorSize / 2,
            duration: 0
        })

        gsap.to(verticalRef.current, {
            x: centerX,
            duration: 0
        })

        gsap.to(horizontalRef.current, {
            y: centerY,
            duration: 0
        })

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseout', handleMouseLeave)

        // Clean up listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseout', handleMouseLeave)
        }
    }, [systemState])

    function handleMouseMove(event: MouseEvent) {

        // Move both x & y if cursor has not reached navigation bar yet
        if (event.clientY > 120) {
            gsap.to(cursorRef.current, {
                x: event.clientX - cursorSize / 2,
                y: event.clientY - cursorSize / 2,
                duration: mouseDuration,
                ease: easeType,
            })

            gsap.to(horizontalRef.current, {
                y: event.clientY,
                duration: mouseDuration,
                ease: easeType,
            })
        } else {
            // Move only x & y if cursor has reached navigation bar
            gsap.to(cursorRef.current, {
                x: event.clientX - cursorSize / 2,
                duration: mouseDuration,
                ease: easeType,
            })
        }

        gsap.to(verticalRef.current, {
            x: event.clientX,
            duration: mouseDuration,
            ease: easeType,
        })
    }

    function handleMouseLeave() {
        // timestamp_log('mouse leave')
    }

    // Instantiate scroll triggers
    useEffect(() => {
        document.querySelectorAll('.section').forEach((section, index) => {
            // Add section
            ScrollTrigger.create({
                trigger: section,
                start: 'center bottom',

                onEnter: () => {
                    gsap.to(titleRef.current, {
                        y: `-${index * 4.5}vmin`,
                        duration: 1,
                        ease: 'power2'
                    })
                    gsap.to(dateRef.current, {
                        y: `-${index * 4.5}vmin`,
                        duration: 1,
                        ease: 'power2'
                    })
                },
                onEnterBack: () => {
                    gsap.to(titleRef.current, {
                        y: `-${index * 4.5}vmin`,
                        duration: 1,
                        ease: 'power2'
                    })
                    gsap.to(dateRef.current, {
                        y: `-${index * 4.5}vmin`,
                        duration: 1,
                        ease: 'power2'
                    })
                },
            })
        })
    }, []);

    return (
        <>
            {/*Cursor item*/}
            <div ref={cursorRef} style={{
                position: "fixed",
                backgroundColor: 'red',
                pointerEvents: 'none',
                height: `${cursorSize}px`,
                width: `${cursorSize}px`,
                transform: `translate(${cursorSize}px, ${cursorSize}px)`,
                zIndex: 10
            }}>
                <div style={{position: 'relative', width: '400px'}}>
                    <div style={{
                        position: 'absolute',
                        top: -30,
                        left: 20,
                        color: 'white'
                    }}>
                        View on Instagram
                    </div>
                </div>
            </div>
            <div ref={verticalRef} style={{
                position: "fixed",
                height: '100dvh',
                pointerEvents: 'none',
                width: '1px',
                backgroundColor: 'rgba(255,255,255,0.3)',
                top: `${HeaderHeight}`,
                zIndex: 1
            }}>
                <div style={{
                    position: 'relative',
                    height: '100%'
                }}>
                    <div style={{
                        height: `${cursorSize}px`,
                        width: `${cursorSize}px`,
                        backgroundColor: 'red',
                        transform: `translateX(-${cursorSize / 2}px)`,
                    }}></div>
                </div>
            </div>
            <div ref={horizontalRef} style={{
                position: "fixed",
                width: '100dvw',
                height: '1px',
                pointerEvents: 'none',
                zIndex: 1,
                backgroundColor: 'rgba(255,255,255,0.3)',
            }}></div>

            {/*Title text*/}
            <Stack align={'end'} gap={0} style={{
                position: 'fixed',
                top: 100,
                right: 25,
                width: '40vw',
                zIndex: 1
            }}>
                <Stack style={{position: 'relative', height: '5vmin', overflow: 'hidden', width: '100%'}}>
                    <div ref={titleRef} style={{position: 'absolute', top: 0, right: 0, width: '40vw'}}>
                        {
                            videoLists.map((video: VideoDetails) => (
                                <Text key={`title-text-${video.title}`} style={{
                                    textAlign: 'end',
                                    fontSize: '4.5vmin',
                                    lineHeight: '4.5vmin',
                                    fontWeight: 700,
                                    color: 'white',
                                }}>{video.title}</Text>
                            ))
                        }
                    </div>
                </Stack>

            </Stack>
            <Stack align={'end'} gap={0} style={{
                position: 'fixed',
                bottom: 25,
                right: 25,
                width: '40vw',
                zIndex: 1
            }}>
                <Stack style={{position: 'relative', height: '5vmin', overflow: 'hidden', width: '100%'}}>
                    <div ref={dateRef} style={{position: 'absolute', top: 0, right: 0, width: '40vw'}}>
                        {
                            videoLists.map((video: VideoDetails, index: number) => (
                                <Text key={`title-text-${video.date}-${index}`} style={{
                                    textAlign: 'end',
                                    fontSize: '4.5vmin',
                                    lineHeight: '4.5vmin',
                                    fontWeight: 300,
                                    color: 'white',
                                }}>{video.date}</Text>
                            ))
                        }
                    </div>
                </Stack>
            </Stack>

            {/*Hero text*/}
            <Text style={{
                position: 'fixed',
                lineHeight: '10vmin',
                fontSize: '12vmin',
                color: 'white',
                bottom: 25,
                left: 25,
                letterSpacing: -4,
                fontWeight: 700,
                userSelect: 'none',
                width: '40%',
                zIndex: 1
            }}>
                WHERE DOES A BORING<span style={{color: 'red'}}>.</span> DEVELOPER ESCAPES?
            </Text>

            {/*Main stack item*/}
            <Stack gap={0}>
                {
                    videoLists.map((videoList: VideoDetails, index: number) => (
                        <video className={"section"} key={`banner-video-${videoList.id}-${index}`} id="banner-video"
                               autoPlay muted
                               playsInline loop
                               style={{
                                   width: '100dvw',
                                   height: '105dvh',
                                   objectFit: 'cover',
                                   zIndex: 0,
                                   cursor: 'pointer'
                               }}>
                            <source src={videoList.url} type="video/webm"/>
                            Your browser does not support the video tag.
                        </video>
                    ))
                }
                <Contact/>
            </Stack>
        </>
    )
}