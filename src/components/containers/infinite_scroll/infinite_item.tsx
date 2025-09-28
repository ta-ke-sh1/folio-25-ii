import {Grid} from "@mantine/core";

export default function InfiniteScrollItem({content, index}) {

    const getRenderLayout = () => {
        switch (index) {
            case 1:
                return <>
                    <Grid.Col span={{base: 12, md: 4}}>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 4}}>
                        {content}
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
                        {content}
                    </Grid.Col>
                </>
            default:
                return <>
                    <Grid.Col span={{base: 12, md: 4}}>
                        {content}
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
            width: '100%',
            color: 'white',
        }}>
            {getRenderLayout()}
        </Grid>
    )
}