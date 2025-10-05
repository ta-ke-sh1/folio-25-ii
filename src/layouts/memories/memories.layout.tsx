import {useEffect} from "react";
import {PreloaderOnEnter} from "../../animations/preloader/preloader.ts";
import {ContainerBase} from "../../components/containers/container.base.tsx";
import {HomepageItem, InfiniteScrollItem} from "../../components/containers/infinite_scroll/infinite_item.tsx";
import InfiniteScroll from "../../components/containers/infinite_scroll/infinite_scroll.tsx";
import CenterTitle from "../../components/containers/title/center.title.tsx";

export default function MemoriesLayout() {

    const items = [
        {
            imageIndex: 1,
            rowIndex: 0,
            title: "SUMMER MEMORIES PT. 1",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 2,
            rowIndex: 2,
            title: "SUMMER MEMORIES PT. 1.5",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 3,
            rowIndex: 1,
            title: "SUMMER MEMORIES PT. 2",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 4,
            rowIndex: 0,
            title: "LOVE AGAIN",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
        {
            imageIndex: 5,
            rowIndex: 2,
            title: "VIEWS FROM MY APARTMENT",
            type: "mp4",
            size: "4.5mb",
            ratio: "1920x1080",
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            PreloaderOnEnter();
        }, 1000);
    }, []);

    {/*Main stack item*/
    }
    return (
        <ContainerBase>
            <CenterTitle title={" where a boring developer reminisces"}/>
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: 0,
                    width: "90dvw",
                    height: "100dvh",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <InfiniteScroll
                        width={"100%"}
                        autoplay={true}
                        autoplaySpeed={0.9}
                        autoplayDirection={"down"}
                        items={items.map((item) => ({
                            content: <InfiniteScrollItem
                                content={<HomepageItem title={item.title} size={item.size} type={item.type}
                                                       ratio={item.ratio} index={item.imageIndex}/>}
                                index={item.rowIndex}/>,
                        }))}
                    />
                </div>
            </div>
        </ContainerBase>
    );
}
