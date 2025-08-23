import {Grid, Group, Stack, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {ArrowSVG} from "../../components/icons/icons.tsx";
import {textShuffleLight} from "../../animations/text/shuffle.ts";
import {mainColors} from "../../enum/colors.ts";
import {useSystemStore} from "../../hooks/system_state.ts";
import {DeviceType} from "../../enum/system_state.ts";

export default function Contact() {

    const {deviceType} = useSystemStore()

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const navItems = ['INSTAGRAM', 'FACEBOOK', 'EMAIL']

    const logoRef = useRef<HTMLImageElement>(null);

    const intervalRef = useRef<number>(null)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev < 8 ? prev + 1 : 0));
        }, 400);

        return () => clearInterval(Number(intervalRef.current));
    }, []);

    useEffect(() => {
        gsap.to(logoRef.current, {
            repeat: -1,
            rotation: "360",
            duration: 10,
            ease: 'linear',
            transformOrigin: 'center center'
        })
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', init_eye_cursor)
        return () => {
            document.removeEventListener('mousemove', init_eye_cursor)
        }
    }, [])

    function init_eye_cursor(event: any) {
        if (deviceType === DeviceType.MOBILE) {
            return
        }

        const eye = document.getElementById("eye-circle")!;
        const eye_2 = document.getElementById("eye-circle-2")!;

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

    const commonStyle = {
        color: 'white',
        letterSpacing: '-0.5px',
        fontSize: '18px',
    }

    function handleMouseClickLink(index: number) {
        console.log(index)
        switch (index) {
            case 0:
                window.open('https://www.instagram.com/tru.ng_ha')
                break;
            case 1:
                window.open('https://www.facebook.com/ed.1698/')
                break;
            case 2: {
                const mailElement = document.createElement("a");
                mailElement.href = "mailto:ha.the.trung.1698@gmail.com?subject=Contact&body=Hi,";
                mailElement.click();
                break;
            }
            default:
                break;
        }
    }

    function handleMouseEnterLink(index: number, data?: string) {
        const textElement = document.getElementById(`nav-link-${index}`)!
        const arrowElement = document.getElementById(`nav-arrow-${index}`)!

        textShuffleLight(textElement, navItems[index], null, 50)

        const cursorText = document.getElementById('cursor-helperText')!
        cursorText.innerHTML = data ?? '[Click to Access]'

        gsap.to(arrowElement, {
            rotation: 45,
            duration: 0.4,
            color: mainColors[index]
        })
    }

    function handleMouseExitLink(index: number) {
        const arrow = document.getElementById(`nav-arrow-${index}`)!

        const cursorText = document.getElementById('cursor-helperText')!
        cursorText.innerHTML = '[TRUNG. HA]'

        gsap.to(arrow, {
            rotation: 0,
            duration: 0.4,
            color: '#ECEEDF'
        })
    }

    return (
        <div style={{
            height: '100dvh',
            width: '100dvw',
            backgroundColor: '#242424',
            zIndex: ZIndexLevel.high - 1,
            position: 'fixed',
            left: 0,
            top: 0,
        }}>
            {
                deviceType === DeviceType.DESKTOP && <div id="eye-outer" style={{
                    position: 'absolute',
                    width: '600px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: ZIndexLevel.high
                }}>
                    <svg viewBox="0 0 617.24 351">
                        <path
                            strokeWidth={1}
                            fill={"rgba(255,255,255, 0.2)"}
                            className="cls-1"
                            d="M308.62,2A354.69,354.69,0,0,1,487.35,50,361.88,361.88,0,0,1,614.9,175.5,361.88,361.88,0,0,1,487.35,301a355,355,0,0,1-84.69,35.48,356.94,356.94,0,0,1-94,12.56,357,357,0,0,1-94.05-12.56A354.73,354.73,0,0,1,129.89,301,362,362,0,0,1,2.33,175.5,362,362,0,0,1,129.89,50,354.61,354.61,0,0,1,308.62,2m0-2C177.71,0,63.11,70.32,0,175.5,63.11,280.68,177.71,351,308.62,351s245.51-70.32,308.62-175.5C554.13,70.32,439.53,0,308.62,0Z"
                        />
                        <path
                            strokeWidth={1}
                            fill={"rgba(255,255,255, 0.2)"}
                            id="eye-circle-2"
                            d="M308.62,64.67a110.84,110.84,0,1,1-78.37,32.46,110.08,110.08,0,0,1,78.37-32.46m0-2A112.83,112.83,0,1,0,421.45,175.5,112.83,112.83,0,0,0,308.62,62.67Z"
                        />
                    </svg>
                </div>
            }
            <Stack style={{
                position: 'absolute',
                zIndex: -1,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <img id="eye-circle" height={deviceType === DeviceType.DESKTOP ? 120 : 125} ref={logoRef}
                     alt={'logo'}
                     src={'/logo.png'}/>
            </Stack>
            <Grid p={"md"} style={{
                height: '100%',
                width: '100%',
                position: 'relative',
            }}>
                <Grid.Col style={{
                    height: '100dvh'
                }} span={{base: 12, md: 6, lg: 4}}>
                    <Stack gap={0} style={{
                        height: '100%'
                    }} justify={'space-between'}>
                        <div>
                            <Group style={{
                                ...commonStyle
                            }}>
                                <div style={{
                                    color: '#ECEEDF'
                                }}>
                                    (STORY)
                                </div>
                            </Group>
                            <Text style={{
                                color: '#ECEEDF',
                                fontSize: '16px',
                                lineHeight: '20px',
                                textTransform: 'uppercase',
                                mixBlendMode: 'difference'
                            }}>
                                Three years of practising & learning at Toshiba Software Development Vietnam
                                has crafted Trung. Ha, a full-stack developer that specializes in materializing your
                                visions in the digital worlds<span style={{color: '#e03131'}}>.</span>
                                <br/>
                                <br/>
                                But Trung doesn’t stop at the screen. He’s also behind the lens—capturing
                                moments, framing stories, and crafting visuals that speak louder than words. His
                                photography and
                                video work bring texture to his technical world, adding depth, emotion, and a cinematic
                                edge to
                                his works<span style={{color: '#e03131'}}>.</span>
                            </Text>
                        </div>
                        <Stack justify={"end"}>
                            <Stack gap={0} style={{width: '100%', marginBottom: '1rem', mixBlendMode: 'difference'}}>
                                <Group style={{
                                    ...commonStyle,
                                }}>
                                    <div style={{
                                        color: '#ECEEDF'
                                    }}>
                                        (SOCIALS)
                                    </div>
                                </Group>
                                <Group justify={'space-between'}
                                       onMouseDown={() => handleMouseClickLink(0)}
                                       onMouseLeave={() => handleMouseExitLink(0)}
                                       onMouseEnter={() => handleMouseEnterLink(0, "[DROP A FOLLOW]")}
                                       style={{
                                           cursor: 'pointer',
                                           ...commonStyle,
                                       }}>
                                    <Group>
                                        <div id={'nav-link-0'} style={{
                                            color: '#ECEEDF'
                                        }}>
                                            INSTAGRAM
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
                                    onMouseEnter={() => handleMouseEnterLink(1, "[WANNA BE FRIENDS?]")}
                                    style={{
                                        cursor: 'pointer',
                                        ...commonStyle
                                    }}>
                                    <Group>
                                        <div id={'nav-link-1'} style={{
                                            color: '#ECEEDF'
                                        }}>
                                            FACEBOOK
                                        </div>
                                    </Group>
                                    <div id={'nav-arrow-1'}>
                                        <ArrowSVG/>
                                    </div>
                                </Group>
                            </Stack>
                            <Stack p={0} m={0} gap={0} style={{width: '100%', mixBlendMode: 'difference'}}>
                                <Group style={{
                                    ...commonStyle
                                }}>
                                    <div style={{
                                        color: '#ECEEDF'
                                    }}>
                                        (CONTACTS)
                                    </div>
                                </Group>
                                <Group
                                    onMouseDown={() => handleMouseClickLink(3)}
                                    onMouseLeave={() => handleMouseExitLink(3)}
                                    justify={'space-between'}
                                    onMouseEnter={() => handleMouseEnterLink(3, "[UNAVAILABLE AFTER 6]")}
                                    style={{
                                        cursor: 'pointer',
                                        ...commonStyle
                                    }}>
                                    <Group>
                                        <div id={'nav-link-3'} style={{
                                            color: '#ECEEDF'
                                        }}>
                                            +(84) 818 161 998
                                        </div>
                                    </Group>
                                </Group>
                                <Group justify={'space-between'}
                                       onMouseDown={() => handleMouseClickLink(2)}
                                       onMouseLeave={() => handleMouseExitLink(2)}
                                       onMouseEnter={() => handleMouseEnterLink(2, "[SOMETHING FORMAL?]")}
                                       style={{
                                           cursor: 'pointer',
                                           ...commonStyle,
                                       }}>
                                    <Group>
                                        <div id={'nav-link-2'} style={{
                                            color: '#ECEEDF'
                                        }}>
                                            EMAIL
                                        </div>
                                    </Group>
                                    <div id={'nav-arrow-2'} style={{
                                        color: '#ECEEDF'
                                    }}>
                                        <ArrowSVG/>
                                    </div>
                                </Group>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6, lg: 4}}>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6, lg: 4}} style={{
                    mixBlendMode: 'difference'
                }}>
                    <Group style={{
                        ...commonStyle
                    }}>
                        <div style={{
                            color: '#ECEEDF'
                        }}>
                            (SERVICES)
                        </div>
                    </Group>
                    <Text style={{color: 'white'}}>
                        FULL-TIME DEVELOPER
                    </Text>
                    <Text style={{color: 'white'}}>
                        PART-TIME MOMENTS RECORDER
                    </Text>
                    <br/>
                    <Text style={{color: 'white'}}>
                        BASED IN HANOI, VIETNAM<span style={{color: '#e03131'}}>.</span>
                    </Text>
                </Grid.Col>
            </Grid>
            {
                Array(10).fill(0).map((_, index) => (
                    <img key={`contact-img-${index}`}
                         alt={`img-${index}`} src={`/small/${currentIndex + 1}.jpg`}
                         style={{
                             border: deviceType === DeviceType.MOBILE ? 'none' : '12px solid white',
                             height: '40%',
                             position: 'absolute',
                             bottom: 0,
                             right: 0,
                             zIndex: -2
                         }}/>
                ))
            }
        </div>
    )
}