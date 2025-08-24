import {Stack, Text} from "@mantine/core";

export default function HomeLayout() {

    return (
        <Stack style={{
            position: 'relative',
            width: '100dvw',
            height: '100dvh',
            overflow: 'hidden',
        }}>
            {/*Hero text*/}
            <Text id={'hero-text'} style={{
                position: 'absolute',
                lineHeight: '10vmin',
                fontSize: '12vmin',
                color: 'white',
                bottom: 25,
                left: 25,
                letterSpacing: -2,
                fontWeight: 700,
                userSelect: 'none',
                pointerEvents: 'none',
                width: '40%',
                zIndex: 1
            }}>
                WHERE DOES A BORING<span style={{color: '#e03131'}}>.</span> DEVELOPER ESCAPE?
            </Text>
        </Stack>

    )
}