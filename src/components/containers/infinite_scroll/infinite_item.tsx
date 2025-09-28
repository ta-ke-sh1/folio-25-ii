import {Grid, Stack, Card, Group, Text} from "@mantine/core";
import {useRef} from "react";
import gsap from "gsap";

export function InfiniteScrollItem({content, height = 250, index}) {

    const getRenderLayout = () => {
        switch (index) {
            case 1:
                return <>
                    <Grid.Col span={{base: 12, md: 4}}>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 4}}>
                        <Stack justify={'center'} align={'center'} style={{
                            width: '100%'
                        }}>
                            {content}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 4}}>
                    </Grid.Col>
                </>
            case 2:
                return <>
                    <Grid.Col span={{base: 12, md: 4}}>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 4}}>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 4}}>
                        <Stack justify={'center'} align={'center'} style={{
                            width: '100%'
                        }}>
                            {content}
                        </Stack>
                    </Grid.Col>
                </>
            default:
                return <>
                    <Grid.Col span={{base: 12, md: 4}}>
                        <Stack justify={'center'} align={'center'} style={{
                            width: '100%'
                        }}>
                            {content}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 4}}>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 4}}>
                    </Grid.Col>
                </>
        }
    }
    return (
        <Grid gutter={0} style={{
            height: `${height}px`,
            width: '100%',
            color: 'white',
        }}>
            {getRenderLayout()}
        </Grid>
    )
}

export function HomepageItem({index, title, size, ratio, type}) {

    const imageRef = useRef(null);

    function handleMouseEnter() {
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                filter: 'saturate(100%)',
                duration: 0.4,
                ease: 'power3'
            })
        }
    }

    function handleMouseLeave() {
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                filter: 'saturate(0%)',
                duration: 0.4,
                ease: 'power3'
            })
        }
    }

    return (
        <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
            width: '100%',
            backgroundColor: 'transparent',
        }}>
            <Stack gap={0} align={"start"} style={{
                color: 'white',
            }}>
                <img ref={imageRef} style={{
                    border: '1px solid white',
                    filter: 'saturate(0%)'
                }} width={'100%'} src={`/thumbnail-${index}.jpg`} alt={`/thumbnail-${index}.jpg`}/>
                <Group>
                    <Text style={{
                        fontSize: '10px'
                    }}>{title}</Text>
                </Group>
                <Group>
                    <Text style={{
                        fontSize: '10px'
                    }}>TYPE: {type};</Text>
                    <Text style={{
                        fontSize: '10px'
                    }}>SIZE: {size}</Text>
                </Group>
                <Group>
                    <Text style={{
                        fontSize: '10px'
                    }}>RATIO: {ratio}</Text>
                </Group>
            </Stack>
        </Card>
    )
}