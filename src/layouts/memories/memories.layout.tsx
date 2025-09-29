import {Stack, Text} from "@mantine/core";
import gsap from "gsap";
import {useEffect, useRef, useState} from "react";
import {ZIndexLevel} from "../../enum/sizing.ts";
import type {VideoDetails} from "./types/home.types.ts";
import {mainColors} from "../../enum/colors.ts";
import {CursorTexts, updateCursorText} from "../../components/cursor/cursor.tsx";

const videoLists: VideoDetails[] = [
    {
        id: 1,
        url: "/video-1.webm",
        date: "08/2025",
        title: "Summer Memories - Pt 3",
        link: "https://www.instagram.com/p/DNTMmoqz2EN/",
    },
    {
        id: 2,
        url: "/video-2.webm",
        date: "07/2025",
        title: "Summer Memories - Pt 2",
        link: "https://www.instagram.com/p/DNBTitOTlEB/",
    },
    {
        id: 3,
        url: "/video-3.webm",
        date: "06/2025",
        title: "Summer Memories - Pt 1",
        link: "https://www.instagram.com/p/DK91viVT6Hv/",
    },
];

export default function MemoriesLayout() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const mainStackRef = useRef<HTMLDivElement>(null);

    // Title ref list
    const titleRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("mousemove", init_eye_cursor);
        return () => {
            document.removeEventListener("mousemove", init_eye_cursor);
        };
    }, []);

    function init_eye_cursor(event: any) {
        const eye = document.getElementById("memories-eye-circle")!;
        const eye_2 = document.getElementById("memories-eye-circle-2")!;

        const x = -(window.innerWidth / 2 - event.pageX) / 8;
        const y = -(window.innerHeight / 2 - event.pageY) / 8;

        const x2 = (x * 3) / 4;
        const y2 = (y * 3) / 4;
        gsap.to(eye, {
            x: `${x}px`,
            y: `${y}px`,
            duration: 0.6,
            ease: "power2",
        });
        gsap.to(eye_2, {
            x: `${x2}px`,
            y: `${y2}px`,
            duration: 0.6,
            ease: "power2",
        });
    }

    useEffect(() => {
        setTimeout(() => {
            const video = document.getElementById(`banner-video-${currentIndex}`) as HTMLVideoElement;
            if (video) {
                video.play();
            }
        }, 3500);
    }, [currentIndex]);

    // Instantiate scroll triggers
    function onMouseEnterVideoDiv(index: number) {
        gsap.to(titleRef.current, {
            y: `-${index * 3.5}vmax`,
            duration: 1,
            ease: "sine.out",
        });
        gsap.to(dateRef.current, {
            y: `${index * 4}vmax`,
            duration: 1,
            ease: "sine.out",
        });
    }

    function handleSelectIndex(index: number) {
        const oldIndex = currentIndex;
        const nextVideo = document.getElementById(`banner-video-${index}`) as HTMLVideoElement;
        if (nextVideo) {
            nextVideo.currentTime = 0;
        }

        if (index !== currentIndex) {
            onMouseEnterVideoDiv(index);
            gsap.to(mainStackRef.current, {
                y: `-${100 * index}dvh`,
                duration: 0,
            });
            setCurrentIndex(index);
        }

        if (nextVideo) {
            nextVideo.play();
        }

        const currentVideo = document.getElementById(`banner-video-${oldIndex}`) as HTMLVideoElement;
        if (currentVideo) {
            currentVideo.currentTime = 0;
        }
    }

    function handleEnded() {
        switch (currentIndex) {
            case 0:
                handleSelectIndex(1);
                break;
            case 1:
                handleSelectIndex(2);
                break;
            case 2:
                handleSelectIndex(0);
                break;
        }
    }

    function handleClickVideo() {
        window.open(videoLists[currentIndex].link);
    }

    return (
        <>
            {/*Title text*/}
            <Stack
                align={"end"}
                gap={0}
                style={{
                    position: "fixed",
                    top: 100,
                    right: 25,
                    width: "100%",
                    zIndex: 1,
                }}
            >
                <Stack style={{position: "relative", height: "3.5vmax", overflow: "hidden", width: "100%"}}>
                    <div ref={titleRef} style={{position: "absolute", top: 0, right: 0, width: "100%"}}>
                        {videoLists.map((video: VideoDetails) => (
                            <Text
                                key={`title-text-${video.title}`}
                                style={{
                                    userSelect: "none",
                                    textAlign: "end",
                                    fontSize: "3.5vmax",
                                    lineHeight: "3.5vmax",
                                    fontWeight: 700,
                                    color: "white",
                                    fontFamily: "Instrument Serif",
                                }}
                            >
                                {video.title}
                            </Text>
                        ))}
                    </div>
                </Stack>
            </Stack>
            <Stack
                align={"end"}
                gap={0}
                style={{
                    position: "fixed",
                    bottom: 25,
                    right: 25,
                    width: "40vw",
                    zIndex: 1,
                }}
            >
                <Stack style={{position: "relative", height: "4vmax", overflow: "hidden", width: "100%"}}>
                    <div ref={dateRef} style={{position: "absolute", top: "-8vmax", right: 0, width: "40vw"}}>
                        {JSON.parse(JSON.stringify(videoLists))
                            .reverse()
                            .map((video: VideoDetails, index: number) => (
                                <Text
                                    key={`title-text-${video.date}-${index}`}
                                    style={{
                                        userSelect: "none",
                                        textAlign: "end",
                                        fontSize: "3.5vmax",
                                        lineHeight: "3.5vmax",
                                        height: "4vmax",
                                        fontWeight: 300,
                                        color: "white",
                                        fontFamily: "Instrument Serif",
                                    }}
                                >
                                    {video.date}
                                </Text>
                            ))}
                    </div>
                </Stack>
            </Stack>
            <Stack
                align={"end"}
                gap={0}
                style={{
                    position: "fixed",
                    top: "50%",
                    right: 25,
                    transform: "translateY(-50%)",
                    width: "100px",
                    zIndex: ZIndexLevel.medium,
                }}
            >
                {videoLists.map((video: VideoDetails, index: number) => (
                    <div
                        onMouseEnter={() => updateCursorText(CursorTexts.selectMemory)}
                        onMouseLeave={() => updateCursorText(CursorTexts.default)}
                        onClick={() => handleSelectIndex(index)}
                        key={`video-${video.title}-${index}-thumbnail`}
                        style={{
                            cursor: "pointer",
                            borderLeft: `4px solid ${mainColors[index + 1]}`,
                            width: "15dvw",
                            minWidth: "100px",
                            height: "10dvh",
                            backgroundImage: `url(/thumbnail-${index + 1}.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            filter: `grayscale(${currentIndex === index ? 0 : 1})`,
                        }}
                    ></div>
                ))}
            </Stack>

            {/*Main stack item*/}
            <Stack
                gap={0}
                onMouseEnter={() => updateCursorText(CursorTexts.default)}
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    height: "100dvh",
                    width: "100dvw",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <div
                        id="memories-eye-outer"
                        style={{
                            position: "absolute",
                            width: "600px",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: ZIndexLevel.high,
                        }}
                    >
                        <svg viewBox="0 0 617.24 351">
                            <path
                                strokeWidth={1}
                                fill={"rgba(255,255,255, 0.2)"}
                                className="cls-1"
                                d="M308.62,2A354.69,354.69,0,0,1,487.35,50,361.88,361.88,0,0,1,614.9,175.5,361.88,361.88,0,0,1,487.35,301a355,355,0,0,1-84.69,35.48,356.94,356.94,0,0,1-94,12.56,357,357,0,0,1-94.05-12.56A354.73,354.73,0,0,1,129.89,301,362,362,0,0,1,2.33,175.5,362,362,0,0,1,129.89,50,354.61,354.61,0,0,1,308.62,2m0-2C177.71,0,63.11,70.32,0,175.5,63.11,280.68,177.71,351,308.62,351s245.51-70.32,308.62-175.5C554.13,70.32,439.53,0,308.62,0Z"
                            />
                            <path strokeWidth={1} fill={"rgba(255,255,255, 0.2)"} id="memories-eye-circle-2"
                                  d="M308.62,64.67a110.84,110.84,0,1,1-78.37,32.46,110.08,110.08,0,0,1,78.37-32.46m0-2A112.83,112.83,0,1,0,421.45,175.5,112.83,112.83,0,0,0,308.62,62.67Z"/>
                            <g
                                id="memories-eye-circle"
                                onClick={handleClickVideo}
                                onMouseEnter={() => updateCursorText(CursorTexts.access)}
                                onMouseLeave={() => updateCursorText(CursorTexts.default)}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <circle r={45} cx="310" cy="176" fill="white"/>
                                <text id="memories-eye-circle" x="285" y="182" fill="#F93827">
                                    [ ▶ ]
                                </text>
                            </g>
                        </svg>
                    </div>
                    <Stack
                        ref={mainStackRef}
                        gap={0}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                        }}
                    >
                        {videoLists.map((videoList: VideoDetails, index: number) => (
                            <video
                                id={`banner-video-${index}`}
                                className={"section"}
                                key={`banner-video-${videoList.id}-${index}`}
                                muted
                                onEnded={handleEnded}
                                playsInline
                                style={{
                                    minWidth: "100dvw",
                                    height: "100dvh",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    zIndex: 0,
                                    filter: "grayscale(100%)",
                                }}
                            >
                                <source src={videoList.url} type="video/webm"/>
                                Your browser does not support the video tag.
                            </video>
                        ))}
                    </Stack>
                </div>
            </Stack>
        </>
    );
}
