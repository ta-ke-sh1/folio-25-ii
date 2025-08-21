import {Stack, Text} from "@mantine/core";
import gsap from "gsap";
import {useEffect, useRef, useState} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {ZIndexLevel} from "../../enum/sizing.ts";
import type {VideoDetails} from "./types/home.types.ts";
import {mainColors} from "../../enum/colors.ts";
import {DeviceType} from "../../enum/system_state.ts";
import Contact from "../contact/contact.layout.tsx";
import {textShuffleLight} from "../../animations/text/shuffle.ts";

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
    const {deviceType} = useSystemStore()

    const [currentIndex, setCurrentIndex] = useState(0);

    const mainStackRef = useRef<HTMLDivElement>(null);

    // Cursor ref list
    const cursorRef = useRef<HTMLDivElement>(null);

    // Title ref list
    const titleRef = useRef<HTMLDivElement>(null)
    const dateRef = useRef<HTMLDivElement>(null)

    const {systemState} = useSystemStore()

    const cursorSize = 6
    const easeType = "power3"
    const mouseDuration = 0.6

    useEffect(() => {
        setTimeout(() => {
            const video = document.getElementById(`banner-video-${currentIndex}`) as HTMLVideoElement;
            if (video) {
                video.play()
            }

        }, 3500)
    }, [currentIndex]);

    // Instantiate cursor events
    useEffect(() => {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2

        if (deviceType === DeviceType.MOBILE) {
            gsap.set(cursorRef.current, {
                x: 35 - cursorSize / 2,
                y: centerY - cursorSize / 2,
                duration: 0
            })
        } else {
            gsap.set(cursorRef.current, {
                x: centerX - cursorSize / 2,
                y: centerY - cursorSize / 2,
                duration: 0
            })

            window.addEventListener('mousemove', handleMouseMove)
            // Clean up listener
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
            }
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
                duration: 0,
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

    function onCursorEnterThumbnail() {
        const text = document.getElementById('cursor-helperText')!
        text.innerHTML = 'Next Item'
    }

    function onCursorLeaveThumbnail() {
        const text = document.getElementById('cursor-helperText')!
        text.innerHTML = 'Click to View'
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
                zIndex: ZIndexLevel.high
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
                        Click to View
                    </div>
                </div>
            </div>

            {/*Title text*/}
            <Stack align={'end'} gap={0} style={{
                position: 'fixed',
                top: 100,
                right: 25,
                width: '100%',
                zIndex: 1
            }}>
                <Stack style={{position: 'relative', height: '4.5vmin', overflow: 'hidden', width: '100%'}}>
                    <div ref={titleRef} style={{position: 'absolute', top: 0, right: 0, width: '100%'}}>
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
            <Stack align={'end'} gap={0} style={{
                position: 'fixed',
                top: '50%',
                right: 25,
                transform: 'translateY(-50%)',
                width: '100px',
                zIndex: ZIndexLevel.medium
            }}>
                {
                    videoLists.map((video: VideoDetails, index: number) => (
                        <div
                            onMouseEnter={onCursorEnterThumbnail}
                            onMouseLeave={onCursorLeaveThumbnail}
                            onClick={() => handleSelectIndex(index)} key={`video-${video.title}-${index}-thumbnail`}
                            style={{
                                cursor: 'pointer',
                                borderLeft: `4px solid ${mainColors[index + 1]}`,
                                width: '15dvw',
                                minWidth: '100px',
                                height: '10dvh',
                                backgroundImage: `url(/thumbnail-${index + 1}.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                filter: `grayscale(${currentIndex === index ? 0 : 1})`
                            }}></div>
                    ))
                }
            </Stack>

            {/*Hero text*/}
            <Text id={'hero-text'} style={{
                position: 'fixed',
                lineHeight: '10vmin',
                fontSize: '12vmin',
                color: 'white',
                bottom: 25,
                left: 25,
                letterSpacing: -2,
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
                                        objectPosition: 'center',
                                        zIndex: 0,
                                        cursor: 'pointer',
                                        filter: 'grayscale(100%)',
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