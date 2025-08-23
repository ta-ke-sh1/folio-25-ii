import {Grid, Group, Stack, Text} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {ArrowSVG} from "../../components/icons/icons.tsx";
import {textShuffleLight} from "../../animations/text/shuffle.ts";
import {mainColors} from "../../enum/colors.ts";

export default function Contact() {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const navItems = ['INSTAGRAM', 'FACEBOOK', 'EMAIL']

    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev < 8 ? prev + 1 : 0));
        }, 400);

        return () => clearInterval(interval);
    }, []);

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
        letterSpacing: '-0.5px',
        fontSize: '18px',
    }

    function handleMouseClickLink(index: number) {
        console.log(index)
        switch (index) {
            case 0:
                break
            case 1:
                break
            case 2:
                const mailElement = document.createElement("a");
                mailElement.href = "mailto:ha.the.trung.1698@gmail.com?subject=Contact&body=Hi,";
                mailElement.click();
                break
            default:
                break
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
            <Stack style={{
                position: 'absolute',
                zIndex: -1,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <img height={250} ref={logoRef} alt={'logo'} src={'/logo.png'}/>
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
                            <Text style={{
                                color: '#ECEEDF',
                                fontSize: '16px',
                                lineHeight: '20px',
                                textTransform: 'uppercase'
                            }}>
                                Three years of practising & learning at Toshiba Software Development Vietnam
                                has crafted Trung. Ha, a full-stack developer that specializes in materializing your
                                visions in the digital worlds.
                                <br/>
                                <br/>
                                But Trung doesn’t stop at the screen. He’s also behind the lens—capturing
                                moments, framing stories, and crafting visuals that speak louder than words. His
                                photography and
                                video work bring texture to his technical world, adding depth, emotion, and a cinematic
                                edge to
                                his works.
                            </Text>
                        </div>
                        <Stack justify={"end"}>
                            <Stack gap={0} style={{width: '100%', marginBottom: '3rem',}}>
                                <Group style={{
                                    ...commonStyle
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
                            <Stack p={0} m={0} gap={0} style={{width: '100%'}}>
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
            </Grid>
            {
                Array(10).fill(0).map((_, index) => (
                    <img key={`contact-img-${index}`} alt={`img-${index}`} src={`/small/${currentIndex + 1}.jpg`}
                         style={{
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