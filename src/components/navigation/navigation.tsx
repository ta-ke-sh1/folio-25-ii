import {Group, Stack, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {DeviceType} from "../../enum/system_state.ts";
import {useDisclosure} from "@mantine/hooks";
import gsap from "gsap";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {BurgerSVG, XMarkSVG} from "../icons/icons.tsx";
import Contact from "../../layouts/contact/contact.layout.tsx";

export default function Navigation() {


    const {deviceType} = useSystemStore()

    const menuRef = useRef<HTMLDivElement>(null)

    const [opened, {toggle}] = useDisclosure();

    const [time, setTime] = useState<string>('')

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            let hours = now.getHours()
            const minutes = now.getMinutes()
            const seconds = now.getSeconds()
            const ampm = hours >= 12 ? 'PM' : 'AM'

            hours = hours % 12
            hours = hours ? hours : 12 // the hour '0' should be '12'

            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')} ${ampm}`

            setTime(formattedTime)
        }

        updateClock() // initial call
        const timer = setInterval(updateClock, 1000)

        return () => clearInterval(timer)
    }, [])

    function handleMenu() {
        if (opened) {
            gsap.to(menuRef.current, {
                opacity: 0,
                duration: 0,
            })
        } else {
            gsap.to(menuRef.current, {
                opacity: 1,
                duration: 0,
            })
        }
        toggle()
    }


    return (
        <>
            <div onClick={handleMenu} style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: ZIndexLevel.high + 1
            }}>
                {
                    opened ? <XMarkSVG stroke={'white'}/> : <BurgerSVG/>
                }
            </div>
            <div style={{
                height: '83px',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                width: '100dvw',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: ZIndexLevel.medium
            }}>
                <Group pr={"lg"} pl={"lg"} justify={'space-between'} style={{
                    height: '100%',
                    width: '100%',
                    userSelect: 'none'
                }}>
                    <img alt={"logo"} src={'/logo-small.png'} height={'30px'}/>
                    {
                        deviceType === DeviceType.DESKTOP ? <> <Text style={{color: 'white', fontSize: 16}}>Hanoi,
                            Vietnam</Text>
                            <Text style={{color: 'white', fontSize: 16}}>{time}</Text>
                            <Group gap={"xl"}>
                            </Group></> : <></>
                    }
                </Group>
            </div>
            {
                opened && <Contact/>
            }
        </>
    )
}

