const addEditProp =(postList)=>{
    postList.forEach((post,index,array)=>{
        array[index]['editText'] = false
    })
    return postList
}

export default addEditProp;