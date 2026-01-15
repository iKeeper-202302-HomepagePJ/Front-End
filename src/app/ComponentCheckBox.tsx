const CheckBox = (id:number, idStirng:string, setCheckList:Function, checkValue:boolean) => {
    return (<input id={`${idStirng}${id}`} type="checkbox" value="" checked={checkValue} className="w-[20px] h-[20px] rounded" onClick={() => {(setCheckList(id))}}></input>)
}
const HeadCheckBox = (idStirng:string, setCheckList:Function) => {
    return (<input id={`Head${idStirng}`} type="checkbox" value="" checked={false} className="w-[20px] h-[20px] rounded" onClick={() => {(setCheckList())}}></input>)
}

export {CheckBox, HeadCheckBox}