import {Group, Stack, Text} from "@mantine/core";
import PrismaticBurst from "../../components/backgrounds/prismatic/prismatic.tsx";
import './styles/home.scss'
import InfiniteScroll from "../../components/containers/infinite_scroll/infinite_scroll.tsx";
import {InfiniteScrollItem, HomepageItem} from "../../components/containers/infinite_scroll/infinite_item.tsx";


export default function HomeLayout() {

    const items = [
        {
            imageIndex: 1,
            rowIndex: 0,
            title: "SUMMER MEMORIES PT. 1",
            type: "mp4",
            size: '4.5mb',
            ratio: '1920x1080'
        },
        {
            imageIndex: 2,
            rowIndex: 2,
            title: "SUMMER MEMORIES PT. 1.5",
            type: "mp4",
            size: '4.5mb',
            ratio: '1920x1080'
        },
        {
            imageIndex: 3,
            rowIndex: 1,
            title: "SUMMER MEMORIES PT. 2",
            type: "mp4",
            size: '4.5mb',
            ratio: '1920x1080'
        },
        {
            imageIndex: 4,
            rowIndex: 0,
            title: "LOVE AGAIN",
            type: "mp4",
            size: '4.5mb',
            ratio: '1920x1080'
        },
        {
            imageIndex: 5,
            rowIndex: 2,
            title: "VIEWS FROM MY APARTMENT",
            type: "mp4",
            size: '4.5mb',
            ratio: '1920x1080'
        },
    ]

    return (
        <Stack style={{
            position: 'relative',
            width: '100dvw',
            height: '100dvh',
            overflow: 'hidden',
        }}>
            {/*Hero text*/}
            <Group pr={"md"} pl={"md"} justify={'space-between'} style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                userSelect: 'none',
                pointerEvents: 'none',
                width: '100dvw',
                zIndex: 1
            }}>
                <Text style={{
                    color: 'white',
                }}>TRUNG. HA</Text>
                <Stack gap={0}>
                    <Text id={'hero-text'} style={{
                        fontFamily: 'Fragment Mono',
                        color: 'white',
                        textAlign: 'center',
                        letterSpacing: 0,
                        lineHeight: 0.6,
                    }}>
                        THIS WEBSITE IS
                    </Text>
                    <Text id={'hero-text'} style={{
                        fontFamily: 'Instrument Serif',
                        color: 'white',
                        textAlign: 'center',
                        letterSpacing: 0,
                        fontSize: '2rem'
                    }}>
                        where a boring developer escapes
                    </Text>
                </Stack>
                <Text style={{
                    color: 'white',
                }}>F0LI0 25</Text>
            </Group>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: 0,
            }}>
                <PrismaticBurst
                    animationType="hover"
                    intensity={4}
                    speed={1.5}
                    distort={4}
                    offset={{x: 0, y: 0}}
                    hoverDampness={0.25}
                    rayCount={12}
                    mixBlendMode="lighten"
                />
            </div>
            <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: 0,
                width: '90dvw',
                height: '100dvh',
            }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}>
                    <InfiniteScroll
                        width={'100%'}
                        autoplay={true}
                        autoplaySpeed={0.5}
                        autoplayDirection={'down'}
                        items={items.map((item) => (
                            {
                                content: <InfiniteScrollItem content={
                                    <HomepageItem title={item.title} size={item.size} type={item.type}
                                                  ratio={item.ratio} index={item.imageIndex}/>
                                } index={item.rowIndex}/>
                            }
                        ))}/>
                </div>
            </div>
        </Stack>
    )
}

