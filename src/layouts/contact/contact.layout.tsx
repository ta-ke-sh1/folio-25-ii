import {Group, Stack, Text} from "@mantine/core";
import {useCallback, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {ZIndexLevel} from "../../enum/sizing.ts";
import {ArrowSVG} from "../../components/icons/icons.tsx";
import {textShuffleLight} from "../../animations/text/shuffle.ts";
import {mainColors} from "../../enum/colors.ts";
import {CursorTexts, updateCursorText} from "../../components/cursor/cursor.tsx";
import {ContainerBase} from "../../components/containers/container.base.tsx";
import {applyNodeChanges, Handle, Position, ReactFlow, ReactFlowProvider} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import {PreloaderOnExit} from "../../animations/preloader/preloader.ts";
import {useLocation, useNavigate} from "react-router";

const ControlsNode = ({data}) => {

    const location = useLocation();

    const navigate = useNavigate()

    function handleNavigate(href: string) {
        const isCurrentPage = location.pathname.includes(href)
        if (isCurrentPage) return

        data.onClick?.();
        PreloaderOnExit();
        setTimeout(() => {
            navigate(href)
        }, 2000)
    }

    const locations = [
        {
            title: "/index",
            url: "/index",
        },
        {
            title: "/memories",
            url: "/memories",
        },
        {
            title: "/playground",
            url: "/playground",
        },
    ]

    const itemPadding = '2px 5px'

    const itemFontSize = 13

    return <Stack style={{
        backgroundColor: 'transparent',
        position: 'relative',
        width: '280px'
    }}>
        <Group
            style={{
                position: 'absolute',
                top: -28,
                left: -3
            }}
        >
            <div
                style={{
                    color: "#ECEEDF",
                    fontSize: 14
                }}
            >
                (navigate)
            </div>
        </Group>
        <Handle type="target" style={{
            opacity: 0,
            left: 0,
            top: -16,
        }} position={Position.Top}/>
        <Stack>
            {
                locations.map((locationItem, index) => {
                    const isCurrentPage = location.pathname.includes(locationItem.url)
                    return <Group>
                        <div
                            onClick={() => handleNavigate(locationItem.url)}
                            key={`nav-item-${index}-${locationItem.title}`} style={{
                            width: '120px',
                            padding: itemPadding,
                            cursor: "pointer",
                            backgroundColor: isCurrentPage ? 'transparent' : 'white',
                            border: isCurrentPage ? '1px solid white' : 'none',
                        }}>
                            <Group>
                                <Text
                                    id={`nav-item-${index}-${locationItem.title}`}
                                    onMouseEnter={(e) => {
                                        textShuffleLight(e.currentTarget, locationItem.title, null, 50);
                                    }}

                                    style={{
                                        fontSize: itemFontSize,
                                        color: isCurrentPage ? 'white' : 'black',
                                    }}
                                >
                                    {locationItem.title}
                                </Text>

                            </Group>
                        </div>
                        {
                            isCurrentPage && <Text style={{color: 'white', fontSize: 12}}>← you are here</Text>
                        }
                    </Group>
                })
            }
        </Stack>
    </Stack>
}


const StoryNode = () => {
    return <Stack ml={'md'} p={'sm'} style={{
        backgroundColor: 'white',
        position: 'relative',
        width: '600px'
    }}>
        <Handle type="target" position={Position.Top}/>
        <Group
            style={{
                position: 'absolute',
                bottom: -28,
                left: 0
            }}
        >
            <div
                style={{
                    color: "#ECEEDF",
                    fontSize: 14
                }}
            >
                (story)
            </div>
        </Group>
        <Text
            style={{
                color: "rgb(0,0,0)",
                fontSize: "14px",
                lineHeight: "20px",
                textTransform: "uppercase",
                fontWeight: 200
            }}
        >
            Three years of practising & learning at Toshiba Software Development Vietnam has crafted
            Trung. Ha, a full-stack developer that specializes in materializing your visions in the
            digital worlds<span style={{color: "#e03131"}}>.</span>
            <br/>
            <br/>
            But Trung doesn’t stop at the screen. He’s also behind the lens—capturing moments,
            framing stories, and crafting visuals that speak louder than words. His photography and
            video work bring texture to his technical world, adding depth, emotion, and a cinematic
            edge
            to his works<span style={{color: "#e03131"}}>.</span>
        </Text>
    </Stack>
}

const ContactsNode = () => {
    const navItems = ["INSTAGRAM", "FACEBOOK", "EMAIL"];

    function handleMouseClickLink(index: number) {
        switch (index) {
            case 0:
                window.open("https://www.instagram.com/tru.ng_ha");
                break;
            case 1:
                window.open("https://www.facebook.com/ed.1698/");
                break;
            case 2: {
                const mailElement = document.createElement("a");
                mailElement.href = "mailto:ha.the.trung.1698@gmail.com?subject=Contact&body=Hi,";
                mailElement.click();
                break;
            }
            default:
                break;
        }
    }

    function handleMouseEnterLink(index: number, text?: any) {
        const textElement = document.getElementById(`nav-link-${index}`)!;
        const arrowElement = document.getElementById(`nav-arrow-${index}`)!;

        textShuffleLight(textElement, navItems[index], null, 50);
        updateCursorText(text ?? CursorTexts.access);

        gsap.to(arrowElement, {
            rotation: 45,
            duration: 0.4,
            color: mainColors[index],
        });
    }

    function handleMouseExitLink(index: number) {
        const arrow = document.getElementById(`nav-arrow-${index}`)!;
        updateCursorText(CursorTexts.default);

        gsap.to(arrow, {
            rotation: 0,
            duration: 0.4,
            color: "black",
        });
    }

    return (
        <Stack m={'md'} justify={"end"} style={{
            backgroundColor: 'white',
            position: 'relative',
            width: "400px"
        }}>
            <Handle type="target" position={Position.Left}/>
            <Group
                style={{
                    position: 'absolute',
                    top: '-25px'
                }}
            >
                <div
                    style={{
                        color: "white",
                        fontSize: '14px'
                    }}
                >
                    (socials & contacts)
                </div>
            </Group>
            <Stack gap={0} p={'sm'} style={{width: "100%"}}>
                <Group
                    justify={"space-between"}
                    onMouseDown={() => handleMouseClickLink(0)}
                    onMouseLeave={() => handleMouseExitLink(0)}
                    onMouseEnter={() => handleMouseEnterLink(0, "[❤️ DROP A FOLLOW]")}
                    style={{
                        cursor: "pointer",
                    }}
                >
                    <Group>
                        <div
                            id={"nav-link-0"}
                            style={{
                                textDecoration: "underline",
                            }}
                        >
                            INSTAGRAM
                        </div>
                    </Group>
                    <div id={"nav-arrow-0"} style={{
                        color: 'black'
                    }}>
                        <ArrowSVG/>
                    </div>
                </Group>
                <Group
                    onMouseDown={() => handleMouseClickLink(1)}
                    onMouseLeave={() => handleMouseExitLink(1)}
                    justify={"space-between"}
                    onMouseEnter={() => handleMouseEnterLink(1, "[👬 WANNA BE FRIENDS?]")}
                    style={{
                        cursor: "pointer",
                    }}
                >
                    <Group>
                        <div
                            id={"nav-link-1"}
                            style={{
                                textDecoration: "underline",
                            }}
                        >
                            FACEBOOK
                        </div>
                    </Group>
                    <div id={"nav-arrow-1"} style={{
                        color: 'black'
                    }}>
                        <ArrowSVG/>
                    </div>
                </Group>
                <Group
                    onMouseDown={() => handleMouseClickLink(3)}
                    onMouseLeave={() => handleMouseExitLink(3)}
                    justify={"space-between"}
                    onMouseEnter={() => handleMouseEnterLink(3, "[📞 UNAVAILABLE AFTER 6]")}
                    style={{
                        cursor: "pointer",
                    }}
                >
                    <Group>
                        <div
                            id={"nav-link-3"}
                        >
                            +(84) 818 161 998
                        </div>
                    </Group>
                </Group>
                <Group
                    justify={"space-between"}
                    onMouseDown={() => handleMouseClickLink(2)}
                    onMouseLeave={() => handleMouseExitLink(2)}
                    onMouseEnter={() => handleMouseEnterLink(2, "[✉️ SOMETHING FORMAL?]")}
                    style={{
                        cursor: "pointer",
                    }}
                >
                    <Group>
                        <div
                            id={"nav-link-2"}
                            style={{
                                textDecoration: "underline",
                            }}
                        >
                            EMAIL
                        </div>
                    </Group>
                    <div
                        id={"nav-arrow-2"}
                        style={{
                            color: 'black'
                        }}
                    >
                        <ArrowSVG/>
                    </div>
                </Group>
            </Stack>
        </Stack>
    )
}

const ServicesNode = () => {
    return <Stack m={0} p={'sm'} style={{
        backgroundColor: 'white',
        position: 'relative',
        width: '300px'
    }}>
        <Handle type="target" position={Position.Bottom}/>
        <div
            style={{
                position: 'absolute',
                color: "#ECEEDF",
                bottom: '-28px',
                left: 0,
                fontSize: 14
            }}
        >
            (services)
        </div>
        <Text style={{fontSize: 14}}>FULL-TIME DEVELOPER</Text>
        <Text style={{fontSize: 14}}>PART-TIME MOMENTS RECORDER</Text>
        <Text style={{fontSize: 14}}>
            BASED IN HANOI, VIETNAM<span style={{color: "#e03131"}}>.</span>
        </Text>
    </Stack>
}

const EyeNode = () => {
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        gsap.to(logoRef.current, {
            repeat: -1,
            rotation: "360",
            duration: 10,
            ease: "linear",
            transformOrigin: "center center",
        });
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", init_eye_cursor);
        return () => {
            document.removeEventListener("mousemove", init_eye_cursor);
        };
    }, []);

    function init_eye_cursor(event: any) {
        const eye = document.getElementById("eye-circle")!;
        const eye_2 = document.getElementById("eye-circle-2")!;

        const x = -(window.innerWidth / 2 - event.pageX) / 8;
        const y = -(window.innerHeight / 2 - event.pageY) / 8;

        const x2 = (x * 3) / 4;
        const y2 = (y * 3) / 4;

        gsap.to(eye, {
            x: `${x * 0.68}px`,
            y: `${y * 0.68}px`,
            duration: 0.6,
            ease: "power2",
        });
        gsap.to(eye_2, {
            x: `${x2}px`,
            y: `${y2}px`,
            duration: 0.6,
            ease: "power2",
        });
    }

    return <Stack style={{
        position: 'relative',
        width: 530,
        height: 360,
        zIndex: ZIndexLevel.high,
    }}>
        <Handle style={{opacity: 1, right: 2, top: 120, zIndex: ZIndexLevel.high + 5}} type="source"
                position={Position.Right}
                id="a"/>
        <Handle style={{opacity: 1, bottom: 1, zIndex: ZIndexLevel.high + 5}} type="source" position={Position.Bottom}
                id="b"/>
        <Handle style={{opacity: 1, left: 25, top: 200, zIndex: ZIndexLevel.high + 5}} type="source"
                position={Position.Left}
                id="c"/>
        <Handle style={{opacity: 1, right: 2, top: 260, zIndex: ZIndexLevel.high + 5}} type="source"
                position={Position.Right}
                id="d"/>
        <img style={{
            position: "absolute",
            zIndex: ZIndexLevel.high + 4,
            height: 100,
            width: 100,
            left: "50%",
            top: "50%",
            opacity: 1,
            transform: "translate(-50%, -50%) scale(0.8)",
        }} id="eye-circle" ref={logoRef} alt={"logo"}
             src={"/logo.png"}/>
        <div
            id="eye-outer"
            style={{
                padding: '40px',
                position: "absolute",
                width: "600px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(0.8)",
                zIndex: ZIndexLevel.high,
                backgroundColor: 'black',
                border: '1px solid white',
            }}
        >
            <div style={{
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: -70,
                    left: -40,

                }}>
                    <Text style={{
                        color: "white",
                        fontSize: "16px",
                    }}>
                        (eye.gif)
                    </Text>
                </div>
            </div>
            <svg viewBox="0 0 617.24 351">
                <path
                    strokeWidth={1}
                    fill={"rgba(255,255,255,1)"}
                    className="cls-1"
                    d="M308.62,2A354.69,354.69,0,0,1,487.35,50,361.88,361.88,0,0,1,614.9,175.5,361.88,361.88,0,0,1,487.35,301a355,355,0,0,1-84.69,35.48,356.94,356.94,0,0,1-94,12.56,357,357,0,0,1-94.05-12.56A354.73,354.73,0,0,1,129.89,301,362,362,0,0,1,2.33,175.5,362,362,0,0,1,129.89,50,354.61,354.61,0,0,1,308.62,2m0-2C177.71,0,63.11,70.32,0,175.5,63.11,280.68,177.71,351,308.62,351s245.51-70.32,308.62-175.5C554.13,70.32,439.53,0,308.62,0Z"
                />
                <path strokeWidth={1} fill={"rgba(255,255,255,1)"} id="eye-circle-2"
                      d="M308.62,64.67a110.84,110.84,0,1,1-78.37,32.46,110.08,110.08,0,0,1,78.37-32.46m0-2A112.83,112.83,0,1,0,421.45,175.5,112.83,112.83,0,0,0,308.62,62.67Z"/>
            </svg>
        </div>
        <div
            style={{
                padding: '40px',
                position: "absolute",
                width: "600px",
                height: "390px",
                top: "50%",
                left: "50%",
                transform: "translate(-48%, -47%) scale(0.8)",
                zIndex: ZIndexLevel.high - 1,
                backgroundColor: 'black',
                border: '1px solid white',
            }}>
        </div>
        <div
            style={{
                padding: '40px',
                position: "absolute",
                width: "600px",
                height: "390px",
                top: "50%",
                left: "50%",
                transform: "translate(-46%, -44%) scale(0.8)",
                zIndex: ZIndexLevel.high - 2,
                backgroundColor: 'black',
                border: '1px solid white',
            }}>
        </div>
    </Stack>
}

export default function Contact({close}) {

    const nodeTypes = {
        contacts: ContactsNode,
        story: StoryNode,
        services: ServicesNode,
        eye: EyeNode,
        controls: ControlsNode
    }

    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    const [nodes, setNodes] = useState([
        {id: 'n4', position: {x: 600, y: 160}, type: 'eye', data: {}},
        {id: 'n1', position: {x: 1200, y: 100}, type: 'contacts', data: {}},
        {id: 'n2', position: {x: 510, y: 600}, type: 'story', data: {}},
        {id: 'n3', position: {x: 240, y: 130}, type: 'services', data: {}},
        {
            id: 'n0', position: {x: 1180, y: 450}, type: 'controls', data: {
                onClick: close
            }
        },
    ])

    const [edges, setEdges] = useState([
        {style: {stroke: 'white'}, id: 'n1-n4', source: 'n4', sourceHandle: 'a', target: 'n1'},
        {style: {stroke: 'white'}, id: 'n2-n4', source: 'n4', sourceHandle: 'b', target: 'n2'},
        {style: {stroke: 'white'}, id: 'n3-n4', source: 'n4', sourceHandle: 'c', target: 'n3'},
        {style: {stroke: 'white'}, id: 'n0-n4', source: 'n4', sourceHandle: 'd', target: 'n0'},
    ])

    return (
        <ContainerBase position={'fixed'} zIndex={ZIndexLevel.highest} style={{
            backgroundColor: 'transparent',
            backdropFilter: 'blur(8px)'
        }}>
            <ReactFlowProvider>
                <ReactFlow
                    defaultEdgeOptions={{type: 'straight'}}
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    zoomOnDoubleClick={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    panOnDrag={false}
                    panOnScroll={false}
                    proOptions={{
                        hideAttribution: true
                    }}
                >
                </ReactFlow>
            </ReactFlowProvider>
        </ContainerBase>
    );
}
