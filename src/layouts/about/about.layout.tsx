import {Grid} from "@mantine/core";

const cursorSize = 6

export default function About() {
    return (
        <div style={{
            width: '100dvw',
            backgroundColor: '#363636',
            zIndex: 10,
            position: 'relative',
        }}>
            <Grid>
                <div style={{
                    top: 0,
                    position: "absolute",
                    left: '75px',
                    height: '100%',
                    pointerEvents: 'none',
                    width: '1px',
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    zIndex: 1
                }}>
                </div>
                <Grid.Col span={{base: 12, md: 6}}>

                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6}} p={"xl"}>
                    <div style={{
                        marginTop: '5dvh',
                        width: '80%',
                        color: 'white',
                        fontSize: '30px',
                        lineHeight: '35px',
                    }}>
                        Born from the pulse of precision and innovation, Trung Ha emerged from the engineering halls of
                        Toshiba Software Development Vietnam, where three years of relentless coding shaped a developer
                        fluent in both logic and artistry. Now charting his own path, Trung crafts digital experiences
                        that blur the line between function and feeling.
                        <br/>
                        <br/>
                        But Trung doesn’t stop at the screen. He’s also behind the lens—capturing moments, framing
                        stories, and crafting visuals that speak louder than words. His photography and video work bring
                        texture to his technical world, adding depth, emotion, and a cinematic edge to his digital
                        craft.
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    )
}