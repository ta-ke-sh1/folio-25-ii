import {Grid, Text} from "@mantine/core";
import {textShuffleLight} from "../../animations/text/shuffle.ts";

export default function About() {
    return (
        <div style={{
            height: '100dvh',
            width: '100dvw',
            backgroundColor: '#363636',
            zIndex: 10,
            position: 'relative',
        }}>
            <Grid>
                <Grid.Col span={{base: 12, md: 6}}>

                </Grid.Col>
                <Grid.Col span={{base: 12, md: 6}}>
                    <div style={{marginTop: '30dvh', width: '100%'}} onMouseEnter={() => {
                        const element = document.getElementById("firstText");
                        textShuffleLight(element, "dreamt of an escape from the daily 9-to-5. ", null, 20)
                    }} onMouseLeave={() => {
                        const element = document.getElementById("firstText");
                        textShuffleLight(element, "wanted to be the best on my field!", null, 20)
                    }}>
                        <Text>
                            <span style={{color: 'white', fontSize: 18}}>
                                Being a developer, I have always
                            </span>
                            {" "}
                            <span
                                style={{color: 'white', fontSize: 18}}
                                id={"firstText"}>
                                wanted to be the best on my field!
                            </span>
                        </Text>
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    )
}