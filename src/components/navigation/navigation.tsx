import {Group, Text, Stack} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {DeviceType} from "../../enum/system_state.ts";
import {useDisclosure} from "@mantine/hooks";
import gsap from "gsap";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {XMarkSVG} from "../icons/icons.tsx";
import Contact from "../../layouts/contact/contact.layout.tsx";
import {NavTitleIds, PreloaderIds} from "../../enum/element_ids.ts";
import {useLocation, useNavigate} from "react-router";
import {PreloaderOnExit} from "../../animations/preloader/preloader.ts";
import {textShuffleLight} from "../../animations/text/shuffle.ts";

export default function Navigation() {

    const location = useLocation();

    const navigate = useNavigate()

    const {deviceType} = useSystemStore();

    const menuRef = useRef<HTMLDivElement>(null);

    const logoRef = useRef<HTMLImageElement>(null);

    const [opened, {toggle}] = useDisclosure();

    const [time, setTime] = useState<string>("");

    // Init event for clock
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const ampm = hours >= 12 ? "PM" : "AM";

            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'

            const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

            setTime(formattedTime);
        };

        updateClock(); // initial call
        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer);
    }, []);

    // Init event for logo rotation
    useEffect(() => {
        gsap.to(logoRef.current, {
            repeat: -1,
            rotation: "360",
            duration: 10,
            ease: "linear",
            transformOrigin: "center center",
        });
    }, []);

    function handleMenu() {
        if (opened) {
            gsap.to(menuRef.current, {
                opacity: 0,
                duration: 0,
            });
        } else {
            gsap.to(menuRef.current, {
                opacity: 1,
                duration: 0,
            });
        }
        toggle();
    }

    function handleMouseEnterNav() {
        const text = document.getElementById("cursor-helperText");
        if (text) {
            text.innerHTML = "[🙋‍♂️ TRUNG. HA]";
        }
    }

    function handleNavigate(href: string) {
        const isCurrentPage = location.pathname.includes(href)
        if (isCurrentPage) return
        PreloaderOnExit();
        setTimeout(() => {
            navigate(href)
        }, 2000)
    }

    const locations = [
        {
            title: "/index",
            url: "/index",
        },
        {
            title: "/memories",
            url: "/memories",
        },
        {
            title: "/playground",
            url: "/playground",
        },
    ]

    const itemPadding = '2px 5px'

    const itemFontSize = 13

    return (
        <>
            <img
                ref={logoRef}
                id={PreloaderIds.logo}
                style={{
                    position: "fixed",
                    zIndex: ZIndexLevel.high + 3,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
                alt={"logo"}
                src={"/logo.png"}
                height={"100px"}
                width={"100px"}
            />
            <Group pr={'md'} pl={'md'} justify={'space-between'} style={{
                position: "fixed",
                zIndex: ZIndexLevel.high + 3,
                top: "50%",
                left: 0,
                width: '100dvw',
                transform: "translateY(-50%)",
            }}>
                <Stack justify="center" style={{height: "100%"}}>
                    <Text
                        id={NavTitleIds.name}
                        style={{
                            textAlign: "start",
                            color: "white",
                            fontSize: 14,
                        }}
                    >
                    </Text>
                </Stack>
                <Stack justify="center" style={{height: "100%"}}>
                    <Text
                        id={NavTitleIds.folio}
                        style={{
                            textAlign: "end",
                            color: "white",
                            fontSize: 14,
                        }}
                    >
                    </Text>
                </Stack>
            </Group>
            <div
                style={{
                    position: "fixed",
                    top: "13px",
                    left: "20px",
                    userSelect: "none",
                    zIndex: ZIndexLevel.high + 1,
                }}
            >
                <Group>
                    {
                        locations.map((locationItem, index) => {
                            const isCurrentPage = location.pathname.includes(locationItem.url)
                            return <div key={`nav-item-${index}-${locationItem.title}`} style={{
                                width: '120px',
                                padding: itemPadding,
                                backgroundColor: isCurrentPage ? 'black' : 'white',
                                border: isCurrentPage ? '1px solid white' : 'none'
                            }}>
                                <Text
                                    id={`nav-item-${index}-${locationItem.title}`}
                                    onMouseEnter={(e) => {
                                        textShuffleLight(e.currentTarget, locationItem.title, null, 50);
                                    }}
                                    onClick={() => handleNavigate(locationItem.url)}
                                    style={{
                                        fontSize: itemFontSize,
                                        color: isCurrentPage ? 'white' : 'black',
                                        cursor: "pointer",
                                    }}
                                >
                                    {locationItem.title}
                                </Text></div>
                        })
                    }
                </Group>
            </div>
            {opened ? (
                <div
                    onClick={handleMenu}
                    style={{
                        position: "fixed",
                        top: "13px",
                        right: "20px",
                        userSelect: "none",
                        zIndex: ZIndexLevel.highest + 1,
                    }}
                >
                    <XMarkSVG style={{}} stroke={"white"}/>
                </div>
            ) : (
                <div
                    onClick={handleMenu}
                    style={{
                        position: "fixed",
                        padding: itemPadding,
                        top: "13px",
                        right: "20px",
                        userSelect: "none",
                        width: '100px',
                        textAlign: 'start',
                        zIndex: ZIndexLevel.high + 1,
                        backgroundColor: 'white',
                    }}
                >
                    <Text
                        onMouseEnter={(e) => {
                            textShuffleLight(e.currentTarget, "/info", null, 50);
                        }}
                        style={{
                            fontSize: itemFontSize,
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                        }}
                    >
                        /info
                    </Text>
                </div>
            )}
            <div
                onMouseEnter={handleMouseEnterNav}
                style={{
                    height: "53px",
                    width: "100dvw",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: ZIndexLevel.medium,
                }}
            >
                <Group
                    pr={"lg"}
                    pl={"lg"}
                    justify={"space-between"}
                    style={{
                        height: "100%",
                        width: "100%",
                        userSelect: "none",
                    }}
                ></Group>
            </div>
            <div
                style={{
                    height: "53px",
                    width: "100dvw",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    zIndex: ZIndexLevel.medium,
                }}
            >
                <Group
                    pr={"lg"}
                    pl={"lg"}
                    justify={"space-between"}
                    style={{
                        height: "100%",
                        width: "100%",
                        userSelect: "none",
                    }}
                >
                    {deviceType === DeviceType.DESKTOP ? (
                        <>
                            <div style={{
                                backgroundColor: 'white',
                                padding: itemPadding,
                            }}>
                                <Text style={{color: "black", fontSize: itemFontSize}}>HAN0I, VIETNAM</Text>
                            </div>
                            <div style={{
                                backgroundColor: 'white',
                                padding: itemPadding
                            }}>
                                <Text style={{color: "black", fontSize: itemFontSize}}>{time}</Text>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </Group>
            </div>
            {opened && <Contact close={toggle}/>}
        </>
    );
}
