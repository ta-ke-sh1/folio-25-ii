import {useEffect} from "react";
import {PreloaderOnEnter} from "../../animations/preloader/preloader.ts";
import {ContainerBase} from "../../components/containers/container.base.tsx";
import {Card, Grid, type MantineStyleProp} from "@mantine/core";

export default function PlaygroundLayout() {

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnEnter();
        }, 1000);
    }, []);

    const gridStyle = {
        height: '50dvh',
    }

    const cardStyle: MantineStyleProp = {
        position: 'relative',
        height: '100%',
        width: '100%',
        backgroundColor: 'black'
    }

    return (
        <ContainerBase>
            <Grid gutter={0} style={{
                height: '100dvh',
                position: 'relative'
            }}>
                {/*Top left*/}
                <Grid.Col pt={'xl'} pl={'xl'} pr={'md'} pb={'md'} span={6} style={{...gridStyle}}>
                    <Card withBorder={true} style={{...cardStyle}}>

                    </Card>
                </Grid.Col>
                {/*Top right*/}
                <Grid.Col pt={'xl'} pl={'md'} pr={'xl'} pb={'md'} span={6} style={{...gridStyle}}>
                    <Card withBorder={true} style={{...cardStyle}}>

                    </Card>
                </Grid.Col>
                {/*Bottom left*/}
                <Grid.Col pt={'md'} pl={'xl'} pr={'md'} pb={'xl'} span={6} style={{...gridStyle}}>
                    <Card withBorder={true} style={{...cardStyle}}>

                    </Card>
                </Grid.Col>
                {/*Bottom right*/}
                <Grid.Col pt={'md'} pl={'md'} pr={'xl'} pb={'xl'} span={6} style={{...gridStyle}}>
                    <Card withBorder={true} style={{...cardStyle}}>

                    </Card>
                </Grid.Col>
            </Grid>
        </ContainerBase>
    );
}
