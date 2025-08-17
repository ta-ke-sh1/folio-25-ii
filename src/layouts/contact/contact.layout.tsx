import {Grid, Group, Stack, Text} from "@mantine/core";
import {useEffect, useRef} from "react";
import gsap from "gsap";

export default function Contact() {

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

    return (
        <div style={{
            height: '100dvh',
            width: '100dvw',
            backgroundColor: '#242424',
            zIndex: 10,
            position: 'relative',
        }}>
            <Stack style={{
                position: 'absolute',
                zIndex: 0,
                left: 0,
                top: 100,
                width: '100%',
            }}>
                <Group pl={"lg"} pr={"lg"} justify={'space-between'}>
                    <Text style={{
                        fontSize: '18px',
                        color: 'white',
                        fontWeight: 800
                    }}>
                        TRUNG<span style={{color: 'red'}}>.</span> HA
                    </Text>
                </Group>
            </Stack>
            <Stack style={{
                position: 'absolute',
                zIndex: 0,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <img height={250} ref={logoRef} alt={'logo'} src={'/logo.png'}/>
            </Stack>
            {/*<Stack style={{*/}
            {/*    position: 'absolute',*/}
            {/*    zIndex: -1,*/}
            {/*    left: '50%',*/}
            {/*    top: '50%',*/}
            {/*    transform: 'translate(-50%, -50%)',*/}
            {/*}}>*/}
            {/*    <div style={{*/}
            {/*        height: '400px',*/}
            {/*        width: '50dvw',*/}
            {/*        backgroundSize: 'cover',*/}
            {/*        backgroundImage: `url(/DSC01061.jpg)`,*/}
            {/*        borderRadius: '2px',*/}
            {/*    }}></div>*/}
            {/*</Stack>*/}
            <Stack gap={0} style={{
                position: 'absolute',
                bottom: 15,
                left: 0,
                width: '100dvw'
            }}>
                <Grid pl={"lg"} pr={"lg"}>
                    <Grid.Col span={{base: 12, lg: 6}}>
                        <Stack gap={20}>
                            <Grid>
                                <Grid.Col span={6}>
                                    <Stack gap={5} mb={"xl"}>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 300
                                        }}>
                                            (SERVICES)
                                        </Text>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 500
                                        }}>
                                            Whatever suits your needs
                                        </Text>
                                    </Stack>
                                    <Stack gap={5}>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 300
                                        }}>
                                            (SOCIALS)
                                        </Text>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 500
                                        }}>
                                            Instagram
                                        </Text>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 500
                                        }}>
                                            Facebook
                                        </Text>
                                    </Stack>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Stack gap={5}>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 300
                                        }}>
                                            (CONTACT)
                                        </Text>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 500
                                        }}>
                                            Email
                                        </Text>
                                        <Text style={{
                                            fontSize: '16px',
                                            color: '#b8b8b8',
                                            fontWeight: 500
                                        }}>
                                            +(84) 818 161 998
                                        </Text>
                                    </Stack>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, lg: 6}}>
                        <Group justify={'end'}>
                            <Text style={{
                                fontSize: '11vmin',
                                lineHeight: '11vmin',
                                color: 'white',
                                bottom: 25,
                                right: 25,
                                textAlign: 'end',
                                letterSpacing: -4,
                                fontWeight: 700,
                                userSelect: 'none',
                                zIndex: 1
                            }}>
                                INTERESTED IN <br/>COLLABORATION?
                            </Text>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Stack>
        </div>
    )
}