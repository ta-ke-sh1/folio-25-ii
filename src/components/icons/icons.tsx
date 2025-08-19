export function ArrowSVG() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M17 7l-10 10"/>
        <path d="M8 7l9 0l0 9"/>
    </svg>
}

export function BurgerSVG() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="white"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 6l16 0"/>
        <path d="M4 12l16 0"/>
        <path d="M4 18l16 0"/>
    </svg>
}

interface XMarkSVGProps {
    stroke?: string
}

export function XMarkSVG({stroke}: XMarkSVGProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
             stroke={`${stroke ?? 'black'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             className="icon icon-tabler icons-tabler-outline icon-tabler-x">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12"/>
            <path d="M6 6l12 12"/>
        </svg>
    )
}