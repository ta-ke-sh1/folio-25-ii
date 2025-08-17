import {Group, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {useSystemStore} from "../../hooks/system_state.ts";
import {DeviceType} from "../../enum/system_state.ts";

export default function Navigation() {

    const {deviceType} = useSystemStore()

    const [time, setTime] = useState<string>('')

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            let hours = now.getHours()
            const minutes = now.getMinutes()
            const seconds = now.getSeconds()
            const ampm = hours >= 12 ? 'PM' : 'AM'

            hours = hours % 12
            hours = hours ? hours : 12 // the hour '0' should be '12'

            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')} ${ampm}`

            setTime(formattedTime)
        }

        updateClock() // initial call
        const timer = setInterval(updateClock, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {

    }, []);

    return <div style={{
        height: '83px',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        width: '100dvw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 11,
    }}>
        <Group pr={"lg"} pl={"lg"} justify={'space-between'} style={{
            height: '100%',
            width: '100%',
        }}>
            <img alt={"logo"} src={'/logo-small.png'} height={'30px'}/>
            {
                deviceType === DeviceType.DESKTOP ? <> <Text style={{color: 'white', fontSize: 16}}>Hanoi,
                    Vietnam</Text>
                    <Text style={{color: 'white', fontSize: 16}}>{time}</Text>
                    <Group gap={"xl"}>
                        <Text style={{color: 'white', fontSize: 16}}>
                            About
                        </Text>
                        <Text style={{color: 'white', fontSize: 16}}>
                            Gallery
                        </Text>
                        <Text style={{color: 'white', fontSize: 16}}>
                            Contacts
                        </Text>
                    </Group></> : <></>
            }
        </Group>
    </div>
}
