import {Grid, Group, Stack} from "@mantine/core";
import {useEffect, useRef} from "react";
import gsap from "gsap";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {ArrowSVG} from "../../components/icons/icons.tsx";
import {textShuffleLight} from "../../animations/text/shuffle.ts";
import {mainColors} from "../../enum/colors.ts";

export default function Contact() {
    const navItems = ['INSTAGRAM', 'FACEBOOK', 'EMAIL']

    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        gsap.to(logoRef.current, {
            repeat: -1,
            rotation: "360",
            duration: 20,
            ease: 'linear',
            transformOrigin: 'center center'
        })
    }, []);

    const commonStyle = {
        color: 'white',
        height: '80px',
        letterSpacing: '-0.5px',
        fontSize: '50px',
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
            color: mainColors[index]
        })
    }

    function handleMouseExitLink(index: number) {
        const arrow = document.getElementById(`nav-arrow-${index}`)!
        gsap.to(arrow, {
            rotation: 0,
            duration: 0.4,
            color: 'white'
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
            <Stack justify="flex-end" style={{
                position: 'relative',
                height: '100%',
                width: '100%',
            }}>
                <Stack style={{
                    position: 'absolute',
                    zIndex: 0,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <img height={250} ref={logoRef} alt={'logo'} src={'/logo.png'}/>
                </Stack>

                <Grid>
                    <Grid.Col span={{base: 12, lg: 4}}>
                        <Stack gap={0} style={{width: '100%'}}>
                            <Group style={{
                                ...commonStyle
                            }}>
                                <div style={{
                                    width: '10px',
                                    backgroundColor: '#F93827',
                                    height: '80px'
                                }}></div>
                                <div>
                                    (SOCIALS)
                                </div>
                            </Group>
                            <Group justify={'space-between'}
                                   onMouseDown={() => handleMouseClickLink(0)}
                                   onMouseLeave={() => handleMouseExitLink(0)}
                                   onMouseEnter={() => handleMouseEnterLink(0)}
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
                                onMouseEnter={() => handleMouseEnterLink(1)}
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
                                        FACEBOOK
                                    </div>
                                </Group>
                                <div id={'nav-arrow-1'}>
                                    <ArrowSVG/>
                                </div>
                            </Group>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col p={0} m={0} span={{base: 12, lg: 2}}>
                    </Grid.Col>
                    <Grid.Col p={0} m={0} span={{base: 12, lg: 4}}>
                        <Stack p={0} m={0} gap={0} style={{width: '100%'}}>
                            <Group style={{
                                ...commonStyle
                            }}>
                                <div style={{
                                    width: '10px',
                                    backgroundColor: '#F93827',
                                    height: '80px'
                                }}></div>
                                <div>
                                    (CONTACTS)
                                </div>
                            </Group>
                            <Group justify={'space-between'}
                                   onMouseDown={() => handleMouseClickLink(2)}
                                   onMouseLeave={() => handleMouseExitLink(2)}
                                   onMouseEnter={() => handleMouseEnterLink(2)}
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
                                    <div id={'nav-link-2'}>
                                        EMAIL
                                    </div>
                                </Group>
                                <div id={'nav-arrow-2'}>
                                    <ArrowSVG/>
                                </div>
                            </Group>
                            <Group
                                onMouseDown={() => handleMouseClickLink(3)}
                                onMouseLeave={() => handleMouseExitLink(3)}
                                justify={'space-between'}
                                onMouseEnter={() => handleMouseEnterLink(3)}
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
                                    <div id={'nav-link-3'}>
                                        +(84) 818 161 998
                                    </div>
                                </Group>
                            </Group>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>

            <div style={{position: 'relative', height: '100%', width: '100%'}}>
                {/*<Group style={{*/}
                {/*    ...commonStyle*/}
                {/*}}>*/}
                {/*    <div style={{*/}
                {/*        width: '10px',*/}
                {/*        backgroundColor: '#F93827',*/}
                {/*        height: '80px'*/}
                {/*    }}></div>*/}
                {/*    <div>*/}
                {/*        TRUNG. HA®*/}
                {/*    </div>*/}
                {/*</Group>*/}


            </div>

        </div>
    )
}