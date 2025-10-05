import {Grid, Group, Stack, Text} from "@mantine/core";

export default function CenterTitle({title}: { title: string }) {
    return (
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
                            {title}
                        </Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{base: 12, sm: 3}}>
                </Grid.Col>
            </Grid>
        </Group>
    )
}