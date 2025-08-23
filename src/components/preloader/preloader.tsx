import type {CSSProperties, FC} from "react";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {useEffect} from "react";
import {PreloaderOnEnter} from "../../animations/preloader/preloader.ts";
import {PreloaderIds} from "../../enum/element_ids.ts";

export const diameter = 200

const circleStyle: CSSProperties = {
    position: 'absolute',
    height: `${diameter}px`,
    width: `${diameter}px`,
    borderRadius: '50%',
    mixBlendMode: "screen"
}

export const Preloader: FC = () => {

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnEnter()
        }, 1000)
    }, [])

    return (
        <div id={PreloaderIds.container} style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100dvw',
            height: '100dvh',
            zIndex: ZIndexLevel.highest,
            backgroundColor: '#242424'
        }}>
            <div style={{
                position: 'relative',
                height: '100%',
                width: '100%',
            }}>
                <div id={PreloaderIds.circleContainer} style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                }}>
                    <div style={{
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                    }}>
                        <div id={`${PreloaderIds.circle}-1`} style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#22b8cf',
                            ...circleStyle
                        }}></div>
                        <div id={`${PreloaderIds.circle}-2`} style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#12b886',
                            ...circleStyle
                        }}></div>
                        <div id={`${PreloaderIds.circle}-3`} style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#fa5252',
                            ...circleStyle
                        }}></div>
                        <div id={`${PreloaderIds.circle}-4`} style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#fd7e14',
                            ...circleStyle
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}