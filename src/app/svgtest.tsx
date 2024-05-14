interface colorInterface {
    [key: string]: string;
}

const cssColor:colorInterface = {
    'black': "#191A20",
    'deepBlue': "#282A35",
    'blue':"#43486B",
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
            width='current' height='current' fill='currentColor' stroke='currentColor' viewBox="0 0 31 32" xmlns="http://www.w3.org/2000/svg">
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
            <path d="M1 30.4583C3.62575 30.6458 7.5505 26.4026 11.5644 20.0971M14.4086 1C14.9082 7.61478 14.5203 11.9901 13.1807 16.1693M11.5644 20.0971C9.01838 28.5523 14.2999 32.8856 19.3522 28.359M11.5644 20.0971C12.2009 18.9196 12.7734 17.44 13.1807 16.1693M13.1807 16.1693C28.0815 0.276335 32.1513 15.6276 13.1807 17.5237" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round"/>
            <path d="M31 8.17858C31 9.3006 30.0904 10.2102 28.9684 10.2102C27.8463 10.2102 26.9368 9.3006 26.9368 8.17858C26.9368 7.05655 27.8463 6.14697 28.9684 6.14697C30.0904 6.14697 31 7.05655 31 8.17858ZM28.2776 8.17858C28.2776 8.56007 28.5869 8.86933 28.9684 8.86933C29.3499 8.86933 29.6591 8.56007 29.6591 8.17858C29.6591 7.79709 29.3499 7.48783 28.9684 7.48783C28.5869 7.48783 28.2776 7.79709 28.2776 8.17858Z" stroke={cssColor[strokeColor]} fill='current'/>
        </svg>
    );
}
export const iconDev = (className: string, strokeColor:string) => {
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

export const iconCert = (className: string, strokeColor:string) => {
    return (
        <svg className={`${className}`} width='30' height='30' fill="none" viewBox="0 0 30 30"  xmlns="http://www.w3.org/2000/svg">
            <rect x="6.25" y="13.75" width="17.5" height="12.5" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.75 10C8.75 6.54822 11.5482 3.75 15 3.75V3.75C18.4518 3.75 21.25 6.54822 21.25 10V13.75H8.75V10Z" stroke={cssColor[strokeColor]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.25C15.6904 21.25 16.25 20.6904 16.25 20C16.25 19.3096 15.6904 18.75 15 18.75C14.3096 18.75 13.75 19.3096 13.75 20C13.75 20.6904 14.3096 21.25 15 21.25Z" stroke={cssColor[strokeColor]} />
        </svg>
    );
}