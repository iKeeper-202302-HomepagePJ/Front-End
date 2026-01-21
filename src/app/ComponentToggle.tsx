export function toggleItemBox (toggleItemList: string[], toggleValue: string, setToggleValue: Function, setShowToggle: Function, className: String) {
    return (
        <button className={`w-full min-w-fit h-auto px-[10px] absolute rounded-lg bg-black fixed top-0 left-0 z-10 drop-shadow-lg`} onClick={(e) => { e.stopPropagation(); setShowToggle(""); }} onMouseLeave={() => setShowToggle("")}>
            <div className='flex justify-between items-center h-fit w-full'>
                <div id={`toggleValue`} className={className + 'w-full text-left content-center'}>{toggleValue}</div>
                <img src='/IconToggle.svg' className='rotate-180'></img>
            </div>
            {toggleItemList.map((toggle: string, i) => (<div key={i} id={`toggle${toggle}`} className={className + `w-fit min-w-full text-left whitespace-pre content-center`} onClick={() => { setShowToggle(""); setToggleValue(toggle); }}>{toggle}</div>))}
        </button>
    )
}

export function toggleMoveBox (toggleItemList:any, className: string){
    return (
        <div className={className + "fixed absolute w-full h-auto rounded-lg"}>
            {toggleItemList.map((toggle: string[], i:number) => (<a key={i} id={`setPage${toggle[0]}`}></a>))}
        </div>
    )
}

export function toggleIdItemBox (toggleItemList: {id:number, name:string}[], toggleValue: number, setToggleValue: Function, setShowToggle: Function, className: String) {
    return (
        <button className={`w-full min-w-fit h-auto px-[10px] absolute rounded-lg bg-black fixed top-0 left-0 z-10 drop-shadow-lg`} onClick={(e) => { e.stopPropagation(); setShowToggle(""); }} onMouseLeave={() => setShowToggle("")}>
            <div className='flex justify-between items-center h-fit w-full'>
                <div id={`toggleValue`} className={className + 'w-full text-left content-center'}>{(toggleItemList.find(obj => obj.id === toggleValue)!.name)}</div>
                <img src='/IconToggle.svg' className='rotate-180'></img>
            </div>
            {toggleItemList.map((toggle: {id:number; name:string;}) => (<div key={toggle.id} id={`toggle${toggle.name}`} className={className + `w-fit min-w-full text-left whitespace-pre content-center`} onClick={() => { setShowToggle(""); setToggleValue(toggle.id); }}>{toggle.name}</div>))}
        </button>
    )
}