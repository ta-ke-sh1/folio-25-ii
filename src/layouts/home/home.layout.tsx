import {Stack, Text} from "@mantine/core";
import {timestamp_log} from "../../utils/log.ts";
import gsap from "gsap";
import {useEffect, useRef, useState} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {HeaderHeight} from "../../enum/sizing.ts";
import type {VideoDetails} from "./types/home.types.ts";

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
    const [currentIndex, setCurrentIndex] = useState(0);

    const mainStackRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const video = document.getElementById(`banner-video-${currentIndex}`) as HTMLVideoElement;
        if (video) {
            video.play()
        }
    }, [currentIndex]);

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

        // Clean up listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
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


    // Instantiate scroll triggers
    function onMouseEnterVideoDiv(index: number) {
        gsap.to(titleRef.current, {
            y: `-${index * 4.5}vmin`,
            duration: 1,
            ease: 'sine.out'
        })
        gsap.to(dateRef.current, {
            y: `-${index * 4.5}vmin`,
            duration: 1,
            ease: 'sine.out'
        })
    }

    function handleSelectIndex(index: number) {
        const oldIndex = currentIndex
        const nextVideo = document.getElementById(`banner-video-${index}`) as HTMLVideoElement;
        if (nextVideo) {
            nextVideo.currentTime = 0
        }

        if (index !== currentIndex) {
            onMouseEnterVideoDiv(index)
            gsap.to(mainStackRef.current, {
                y: `-${100 * index}dvh`,
                ease: 'power3',
                duration: 1,
            })
            setCurrentIndex(index)
        }

        if (nextVideo) {
            nextVideo.play()
        }

        const currentVideo = document.getElementById(`banner-video-${oldIndex}`) as HTMLVideoElement;
        if (currentVideo) {
            currentVideo.currentTime = 0
        }
    }

    function handleEnded() {
        console.log(`on ended ${currentIndex}`)
        switch (currentIndex) {
            case 0:
                handleSelectIndex(1)
                break
            case 1:
                handleSelectIndex(2)
                break
            case 2:
                handleSelectIndex(0)
                break
        }
    }

    return (
        <>
            {/*Cursor item*/}
            <div ref={cursorRef} style={{
                position: "fixed",
                backgroundColor: '#e03131',
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
                        backgroundColor: '#e03131',
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

            <Stack align={'end'} gap={5} style={{
                position: 'fixed',
                top: '50%',
                right: 25,
                transform: 'translateY(-50%)',
                width: '100px',
                zIndex: 100
            }}>
                {
                    videoLists.map((video: VideoDetails, index: number) => (
                        <div onClick={() => handleSelectIndex(index)} key={`video-${video.title}-${index}-thumbnail`}
                             style={{
                                 width: '10dvw',
                                 minWidth: '100px',
                                 height: '50px',
                                 backgroundColor: '#e03131'
                             }}></div>
                    ))
                }
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
                WHERE DOES A BORING<span style={{color: '#e03131'}}>.</span> DEVELOPER ESCAPES?
            </Text>

            {/*Main stack item*/}
            <Stack gap={0} style={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100dvh',
                width: '100dvw',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%'
                }}>
                    <Stack ref={mainStackRef} gap={0} style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }}>
                        {
                            videoLists.map((videoList: VideoDetails, index: number) => (
                                <video
                                    id={`banner-video-${index}`} className={"section"}
                                    key={`banner-video-${videoList.id}-${index}`}
                                    muted
                                    onEnded={handleEnded}
                                    playsInline
                                    style={{
                                        minWidth: '100dvw',
                                        height: '100dvh',
                                        objectFit: 'cover',
                                        zIndex: 0,
                                        cursor: 'pointer'
                                    }}>
                                    <source src={videoList.url} type="video/webm"/>
                                    Your browser does not support the video tag.
                                </video>
                            ))
                        }
                    </Stack>
                </div>
            </Stack>
        </>
    )
}