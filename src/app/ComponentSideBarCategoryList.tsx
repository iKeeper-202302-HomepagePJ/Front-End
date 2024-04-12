interface categoryDataObject {
    id : number;
    name : string;
    data : smallCategoryObject[]
}
interface smallCategoryObject {
    id : number;
    name : string
}


const CategoryList = (categoryData:categoryDataObject[]) => {
    return(
        <div className="flex-col space-y-[10px]">
            <a href={`/postListPage/1`} className="text-[20px] font-bold text-pink flex items-center mb-[5px]"><img src="/IconFile.svg"/>전체 게시물</a>
            {categoryData.map((key:categoryDataObject) => (<div className="flex flex-col">
                <a href={`/postListPage/${key.name}/${key.id}/1`} className="text-[20px] font-bold text-pink flex items-center mb-[5px]"><img src="/IconFile.svg"/>{key.name}</a>
                <div className="flex flex-col px-[10px]">
                    {key.data.map((item : {id : number; name : string}) => (<a href={`/postListPage/${key.name}/${key.id}/${item.name}/${item.id}/1`} className="text-[16px] font-semibold text-green flex items-center"><img src="/IconArrow.svg"/>{item.name}</a>))}
                </div>
            </div>))}
        </div>
    )
}

export {CategoryList}