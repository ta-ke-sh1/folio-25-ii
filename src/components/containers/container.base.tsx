import {Stack} from "@mantine/core";
import {CursorTexts, updateCursorText} from "../cursor/cursor.tsx";
import type {PropsWithChildren, CSSProperties} from "react";
import React from "react";
import type {ZIndexLevel} from "../../enum/sizing.ts";

interface ContainerBaseProps {
    width?: string | number,
    height?: string | number
    position?: "absolute" | "fixed" | "relative",
    top?: string | number,
    left?: string | number,
    backgroundColor?: string,
    zIndex?: ZIndexLevel | number,
    style? : CSSProperties
}

export const ContainerBase: React.FC<PropsWithChildren<ContainerBaseProps>> = (
    {
        style,
        top = 0,
        left = 0,
        position = "absolute",
        width = '100dvw',
        height = '100dvh',
        backgroundColor = 'black',
        zIndex = 0,
        children,
    }) => {

    const positionDefault = position === "absolute" || position === "fixed" ? {
        left: left,
        top: top,
    } : {}

    return (
        <Stack
            gap={0}
            onMouseEnter={() => updateCursorText(CursorTexts.default)}
            style={{
                position: position,
                ...positionDefault,
                height: height,
                width: width,
                overflow: "hidden",
                backgroundColor: backgroundColor,
                zIndex: zIndex,
                ...style,
            }}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                {children}
            </div>
        </Stack>
    );
}