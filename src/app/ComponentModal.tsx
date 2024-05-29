export function Modal(className:string, modalContent:Function, setOpenModal:Function) {
    return (
        <div>
            <div className='w-screen h-screen bg-deepBlue opacity-80 fixed top-0 left-0 right-0 z-40' onClick={() => setOpenModal(false)}></div>
            <div className={`${className} rounded-lg bg-black text-white text-[20px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40`}>
                {modalContent()}
            </div>
        </div>
    )
}