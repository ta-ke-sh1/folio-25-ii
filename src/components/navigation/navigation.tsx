import {Group, Stack, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {DeviceType} from "../../enum/system_state.ts";
import {useDisclosure} from "@mantine/hooks";
import gsap from "gsap";
import {textShuffleLight} from "../../animations/text/shuffle.ts";

const navItems = ['ABOUT ME', 'GALLERIA', 'CONTACT']
const navColors = ['#FF9D23', '#FFD65A', '#16C47F']

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

    const commonStyle = {
        color: 'black',
        height: '80px',
        letterSpacing: '-0.5px',
        fontSize: '50px',
        backgroundColor: 'white',
    }


    function handleMouseClickLink(index: number) {
        console.log(index)
    }

    function handleMouseEnterLink(index: number) {
        const text = document.getElementById(`nav-link-${index}`)!
        const arrow = document.getElementById(`nav-arrow-${index}`)!

        textShuffleLight(text, navItems[index], null, 50)

        gsap.to(arrow, {
            rotation: 45,
            duration: 0.4,
            color: navColors[index]
        })
    }

    function handleMouseExitLink(index: number) {
        const arrow = document.getElementById(`nav-arrow-${index}`)!
        gsap.to(arrow, {
            rotation: 0,
            duration: 0.4,
            color: 'black'
        })
    }

    return (
        <>
            <Stack gap={0} ref={menuRef} style={{
                position: 'fixed',
                top: '15px',
                right: '15px',
                width: '90dvw',
                maxWidth: '400px',
                zIndex: 100,
                opacity: 0,
            }}>
                <Group style={{
                    ...commonStyle
                }}>
                    <div style={{
                        width: '10px',
                        backgroundColor: '#F93827',
                        height: '80px'
                    }}></div>
                    <div>
                        TRUNG. HA®
                    </div>
                </Group>
                <Group justify={'space-between'}
                       onMouseDown={() => handleMouseClickLink(0)}
                       onMouseLeave={() => handleMouseExitLink(0)}
                       onMouseEnter={() => handleMouseEnterLink(0)} pr={2}
                       style={{
                           cursor: 'pointer',
                           ...commonStyle,
                       }}>
                    <Group>
                        <div style={{
                            width: '10px',
                            backgroundColor: '#FF9D23',
                            height: '80px'
                        }}></div>
                        <div id={'nav-link-0'}>
                            ABOUT ME
                        </div>
                    </Group>
                    <div id={'nav-arrow-0'}>
                        <ArrowSVG/>
                    </div>
                </Group>
                <Group
                    onMouseDown={() => handleMouseClickLink(1)}
                    onMouseLeave={() => handleMouseExitLink(1)}
                    justify={'space-between'}
                    onMouseEnter={() => handleMouseEnterLink(1)} pr={2}
                    style={{
                        cursor: 'pointer',
                        ...commonStyle
                    }}>
                    <Group>
                        <div style={{
                            width: '10px',
                            backgroundColor: '#FFD65A',
                            height: '80px'
                        }}></div>
                        <div id={'nav-link-1'}>
                            GALLERIA
                        </div>
                    </Group>
                    <div id={'nav-arrow-1'}>
                        <ArrowSVG/>
                    </div>
                </Group>
                <Group
                    onMouseDown={() => handleMouseClickLink(2)}
                    onMouseLeave={() => handleMouseExitLink(2)}
                    justify={'space-between'}
                    onMouseEnter={() => handleMouseEnterLink(2)} pr={2}
                    style={{
                        cursor: 'pointer',
                        ...commonStyle
                    }}>
                    <Group>
                        <div style={{
                            width: '10px',
                            backgroundColor: '#16C47F',
                            height: '80px'
                        }}></div>
                        <div id={'nav-link-2'}>
                            CONTACT
                        </div>
                    </Group>
                    <div id={'nav-arrow-2'}>
                        <ArrowSVG/>
                    </div>
                </Group>
            </Stack>
            <div onClick={handleMenu} style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 101
            }}>
                {
                    opened ? <XMarkSVG/> : <BurgerSVG/>
                }
            </div>
            <div style={{
                height: '83px',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                width: '100dvw',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 11,
            }}>
                <Group pr={"lg"} pl={"lg"} justify={'space-between'} style={{
                    height: '100%',
                    width: '100%',
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
        </>
    )
}

function ArrowSVG() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M17 7l-10 10"/>
        <path d="M8 7l9 0l0 9"/>
    </svg>
}

function BurgerSVG() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="white"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 6l16 0"/>
        <path d="M4 12l16 0"/>
        <path d="M4 18l16 0"/>
    </svg>
}

function XMarkSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
             stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className="icon icon-tabler icons-tabler-outline icon-tabler-x">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12"/>
            <path d="M6 6l12 12"/>
        </svg>
    )
}
