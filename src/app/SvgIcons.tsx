import { calculateOverrideValues } from "next/dist/server/font-utils";

interface colorInterface {
    [key: string]: string;
}

const cssColor: colorInterface = {
    'black': "#191A20",
    'deepBlue': "#282A35",
    'blue': "#43486B",
    'white': "#F8F8F2",
    'orange': "#FFB86C",
    'skyblue': "#8BE9FD",
    'green': "#50FA7B",
    'pink': "#FF79C6",
    'red': "#FF4E59",
    'yellow': "#F0DB6D",
    'deepYellow': "#444444",
    'gray': "#6B7280"
}



export const iconPencil = (className: string, strokeColor: string) => {
    return (
        <svg
            className={`${className}`}
            width='current' height='current' fill='none' stroke='currentColor' viewBox="12 11 18 18" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.8773 13.2892C25.6583 12.5082 26.9247 12.5082 27.7057 13.2892L28.7106 14.2941C29.4917 15.0752 29.4917 16.3415 28.7106 17.1225L18.2523 27.5809C17.8772 27.956 17.3685 28.1667 16.8381 28.1667L13.8332 28.1667L13.8332 25.1618C13.8332 24.6313 14.0439 24.1226 14.419 23.7475L24.8773 13.2892Z" stroke={cssColor[strokeColor]} stroke-width="2" />
            <path d="M23.4165 14.75L27.2498 18.5833" stroke={cssColor[strokeColor]} stroke-width="2" />
        </svg>
    );
}
export const iconIKeeper = (className: string, strokeColor: string) => {
    return (
        <svg
            className={`${className}`}
            width='30' height='30' fill='none' viewBox="0 0 31 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 30.4583C3.62575 30.6458 7.5505 26.4026 11.5644 20.0971M14.4086 1C14.9082 7.61478 14.5203 11.9901 13.1807 16.1693M11.5644 20.0971C9.01838 28.5523 14.2999 32.8856 19.3522 28.359M11.5644 20.0971C12.2009 18.9196 12.7734 17.44 13.1807 16.1693M13.1807 16.1693C28.0815 0.276335 32.1513 15.6276 13.1807 17.5237" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round" />
            <path d="M31 8.17858C31 9.3006 30.0904 10.2102 28.9684 10.2102C27.8463 10.2102 26.9368 9.3006 26.9368 8.17858C26.9368 7.05655 27.8463 6.14697 28.9684 6.14697C30.0904 6.14697 31 7.05655 31 8.17858ZM28.2776 8.17858C28.2776 8.56007 28.5869 8.86933 28.9684 8.86933C29.3499 8.86933 29.6591 8.56007 29.6591 8.17858C29.6591 7.79709 29.3499 7.48783 28.9684 7.48783C28.5869 7.48783 28.2776 7.79709 28.2776 8.17858Z" stroke={cssColor[strokeColor]} fill='current' />
        </svg>
    );
}
export const iconDev = (className: string, strokeColor: string) => {
    return (
        <svg className={`${className}`} width='30' height='30' fill="none" stroke={cssColor[strokeColor]} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="laptop">
                <rect id="Rectangle 2" x="20" y="6" width="12" height="16" rx="1" transform="rotate(90 20 6)" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path id="Path 2" d="M2 18H22" stroke-width="2" stroke-linecap="round" />
                <path id="Path 2_2" d="M4 17H20" stroke-width="2" stroke-linecap="round" />
            </g>
        </svg>
    )
}

export const iconCert = (className: string, strokeColor: string) => {
    return (
        <svg className={`${className}`} width='30' height='30' fill="none" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <rect x="6.25" y="13.75" width="17.5" height="12.5" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.75 10C8.75 6.54822 11.5482 3.75 15 3.75V3.75C18.4518 3.75 21.25 6.54822 21.25 10V13.75H8.75V10Z" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.25C15.6904 21.25 16.25 20.6904 16.25 20C16.25 19.3096 15.6904 18.75 15 18.75C14.3096 18.75 13.75 19.3096 13.75 20C13.75 20.6904 14.3096 21.25 15 21.25Z" stroke={cssColor[strokeColor]} />
        </svg>
    );
}

export const IconWarining = (className: string, strokeColor: string) => {
    return (
        <svg className={className} width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="danger">
                <path id="Path 5" d="M24.5 20.4165V26.5415" stroke={cssColor[strokeColor]} stroke-width="3" stroke-linecap="round" />
                <path id="Oval" fill-rule="evenodd" clip-rule="evenodd" d="M24.5 34.7083C25.6276 34.7083 26.5417 33.7942 26.5417 32.6667C26.5417 31.5391 25.6276 30.625 24.5 30.625C23.3724 30.625 22.4583 31.5391 22.4583 32.6667C22.4583 33.7942 23.3724 34.7083 24.5 34.7083Z" fill={cssColor[strokeColor]} />
                <path id="Triangle" fill-rule="evenodd" clip-rule="evenodd" d="M23.6381 7.59029C24.0247 6.93298 24.9753 6.93298 25.3619 7.59029L44.0302 39.3263C44.4223 39.9929 43.9417 40.8333 43.1682 40.8333H5.83174C5.05833 40.8333 4.57767 39.9929 4.96981 39.3263L23.6381 7.59029Z" stroke={cssColor[strokeColor]} stroke-width="3" stroke-linejoin="round" />
            </g>
        </svg>
    )
}

export const IconLoudSpeaker = (className: string, strokeColor: string) => {
    return (
        <svg className={className} width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37183 12.5691C4.37183 11.0601 5.59407 9.8367 7.10315 9.8367C8.943 9.8367 11.3472 9.8367 13.1156 9.8367C16.3946 9.8367 20.7665 4.37183 20.7665 4.37183V20.7665C20.7665 20.7665 16.3946 15.3016 13.1156 15.3016C11.3472 15.3016 8.943 15.3016 7.10315 15.3016C5.59407 15.3016 4.37183 14.0782 4.37183 12.5691V12.5691Z" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.65088 15.3018L9.83683 21.8596H14.2087L12.0228 15.3018H7.65088Z" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linejoin="round" />
            <path d="M12.0227 9.83667V15.3015" stroke={cssColor[strokeColor]} stroke-width="2" />
        </svg>
    )
}

export const IconStar = (className: string, strokeColor: string) => {
    return (
        <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0682 16.3303L4.35653 21.1776L7.00213 13.294L0.272727 8.42898H8.51136L11.0682 0.545453L13.625 8.42898H21.8636L15.1342 13.294L17.7798 21.1776L11.0682 16.3303Z" fill={cssColor[strokeColor]} />
        </svg>
    )
}

export const IconCheck = (className: string, strokeColor: string) => {
    return (
        <svg className={className} width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 10.5L9.25 16.75L23 3" stroke={cssColor[strokeColor]} stroke-width="5" stroke-linecap="round" />
        </svg>
    )
}

export const IconBook = (className: string, strokeColor: string) => {
    return (
        <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="notebook">
                <path id="Path 2" d="M12 10.6668H18.6667" stroke="#43486B" stroke-width="2" stroke-linecap="round" />
                <g id="Group 83">
                    <path id="Rectangle 2" fill-rule="evenodd" clip-rule="evenodd" d="M24.0003 4V28H7.66699C7.11471 28 6.66699 27.5523 6.66699 27V5C6.66699 4.44772 7.11471 4 7.66699 4H24.0003Z" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <path id="Path 45" d="M6.66699 25.3332V23.6665C6.66699 23.1142 7.11471 22.6665 7.66699 22.6665H24.0003" stroke={cssColor[strokeColor]}stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
        </svg>

    )
}