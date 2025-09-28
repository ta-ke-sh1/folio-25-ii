import {Grid, Stack, Text} from "@mantine/core";
import PrismaticBurst from "../../components/backgrounds/prismatic/prismatic.tsx";
import './styles/home.scss'
import InfiniteScroll from "../../components/containers/infinite_scroll/infinite_scroll.tsx";
import InfiniteScrollItem from "../../components/containers/infinite_scroll/infinite_item.tsx";

export default function HomeLayout() {

    return (
        <Stack style={{
            position: 'relative',
            width: '100dvw',
            height: '100dvh',
            overflow: 'hidden',
        }}>
            {/*Hero text*/}
            <Stack gap={0} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                userSelect: 'none',
                pointerEvents: 'none',
                width: '40%',
                zIndex: 1
            }}>
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
                left: 0,
                top: 0,
                width: '100dvw',
                height: '100dvh',
            }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100dvh',
                }}>
                    <InfiniteScroll
                        width={'100%'}
                        autoplay={false}
                        autoplaySpeed={0.1}
                        items={[
                            {
                                content: <InfiniteScrollItem content={
                                    <p>Paragraph Item 2</p>
                                } index={0}/>
                            },
                            {
                                content: <InfiniteScrollItem content={
                                    <p>Paragraph Item 2</p>
                                } index={1}/>
                            },
                            {
                                content: <InfiniteScrollItem content={
                                    <p>Paragraph Item 2</p>
                                } index={2}/>
                            },
                            {
                                content: <InfiniteScrollItem content={
                                    <p>Paragraph Item 2</p>
                                } index={1}/>
                            },
                        ]}/>
                </div>
            </div>
        </Stack>
    )
}