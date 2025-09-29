import {Group, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {DeviceType} from "../../enum/system_state.ts";
import {useDisclosure} from "@mantine/hooks";
import gsap from "gsap";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {XMarkSVG} from "../icons/icons.tsx";
import Contact from "../../layouts/contact/contact.layout.tsx";
import {PreloaderIds} from "../../enum/element_ids.ts";

export default function Navigation() {
    const {deviceType} = useSystemStore();

    const menuRef = useRef<HTMLDivElement>(null);

    const logoRef = useRef<HTMLImageElement>(null);

    const [opened, {toggle}] = useDisclosure();

    const [time, setTime] = useState<string>("");

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

    useEffect(() => {
        gsap.to(logoRef.current, {
            repeat: -1,
            rotation: "360",
            duration: 10,
            ease: "linear",
            transformOrigin: "center center",
        });
    }, []);

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
            <div
                onClick={handleMenu}
                style={{
                    position: "fixed",
                    top: "13px",
                    left: "20px",
                    userSelect: "none",
                    zIndex: ZIndexLevel.high + 1,
                }}
            >
                <Group>
                    <Text
                        style={{
                            fontSize: 14,
                            textDecoration: "underline",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        /memories
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            textDecoration: "underline",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        /playground
                    </Text>
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
                        top: "13px",
                        right: "20px",
                        userSelect: "none",
                        zIndex: ZIndexLevel.high + 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            textDecoration: "underline",
                            color: "white",
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
                            {" "}
                            <Text style={{color: "white", fontSize: 14}}>HAN0I, VIETNAM</Text>
                            <Text style={{color: "white", fontSize: 14}}>{time}</Text>
                        </>
                    ) : (
                        <></>
                    )}
                </Group>
            </div>
            {opened && <Contact/>}
        </>
    );
}
