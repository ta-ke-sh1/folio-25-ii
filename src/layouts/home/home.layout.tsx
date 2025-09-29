import {Grid, Group, Stack, Text} from "@mantine/core";
import PrismaticBurst from "../../components/backgrounds/prismatic/prismatic.tsx";
import "./styles/home.scss";
import InfiniteScroll from "../../components/containers/infinite_scroll/infinite_scroll.tsx";
import {HomepageItem, InfiniteScrollItem} from "../../components/containers/infinite_scroll/infinite_item.tsx";
import {mainColors} from "../../enum/colors.ts";
import {useMediaQuery} from "@mantine/hooks";
import {useEffect} from "react";
import {PreloaderOnFirstEntrance} from "../../animations/preloader/preloader.ts";

export default function HomeLayout() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    const items = [
        {
            imageIndex: 1,
            rowIndex: 0,
            title: "SUMMER MEMORIES PT. 1",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 2,
            rowIndex: 2,
            title: "SUMMER MEMORIES PT. 1.5",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 3,
            rowIndex: 1,
            title: "SUMMER MEMORIES PT. 2",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 4,
            rowIndex: 0,
            title: "LOVE AGAIN",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 5,
            rowIndex: 2,
            title: "VIEWS FROM MY APARTMENT",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnFirstEntrance();
        }, 1000);
    }, [])

    return (
        <Stack
            style={{
                position: "relative",
                width: "100dvw",
                height: "100dvh",
                overflow: "hidden",
            }}
        >
            {/*Hero text*/}
            <Group
                pr={"md"}
                pl={"md"}
                justify={"space-between"}
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    userSelect: "none",
                    pointerEvents: "none",
                    width: "100dvw",
                    zIndex: 1,
                }}
            >
                <Grid style={{width: "100%"}}>
                    <Grid.Col span={{base: 12, sm: 3}}>
                        <Stack justify="center" style={{height: "100%"}}>
                            <Text
                                style={{
                                    textAlign: isMobile ? "center" : "start",
                                    color: "white",
                                    fontSize: 14,
                                }}
                            >
                                TRUNG. HA
                            </Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Stack gap={0} style={{height: "100%"}}>
                            <Text
                                id={"hero-text"}
                                style={{
                                    fontFamily: "Fragment Mono",
                                    color: "white",
                                    textAlign: "center",
                                    letterSpacing: 0,
                                    lineHeight: 0.6,
                                    marginBottom: "70px",
                                }}
                            >
                                THIS WEBSITE IS
                            </Text>
                            <Text
                                id={"hero-text"}
                                style={{
                                    marginTop: "70px",
                                    fontFamily: "Instrument Serif",
                                    color: "white",
                                    textAlign: "center",
                                    letterSpacing: 0,
                                    fontSize: "2rem",
                                    transform: "translateY(30px)",
                                }}
                            >
                                where a boring developer escapes
                            </Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, sm: 3}}>
                        <Stack justify="center" style={{height: "100%"}}>
                            <Text
                                style={{
                                    textAlign: isMobile ? "center" : "end",
                                    color: "white",
                                    fontSize: 14,
                                }}
                            >
                                folio .25
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Group>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    backgroundColor: "black",
                }}
            >
                <PrismaticBurst colors={mainColors} animationType="rotate3d" intensity={5} speed={0.8} distort={5}
                                hoverDampness={0.25} rayCount={12} mixBlendMode="lighten"/>
            </div>
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: 0,
                    width: "90dvw",
                    height: "100dvh",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <InfiniteScroll
                        width={"100%"}
                        autoplay={true}
                        autoplaySpeed={0.9}
                        autoplayDirection={"down"}
                        items={items.map((item) => ({
                            content: <InfiniteScrollItem
                                content={<HomepageItem title={item.title} size={item.size} type={item.type}
                                                       ratio={item.ratio} index={item.imageIndex}/>}
                                index={item.rowIndex}/>,
                        }))}
                    />
                </div>
            </div>
        </Stack>
    );
}
