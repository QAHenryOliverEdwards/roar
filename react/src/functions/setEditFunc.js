const changeEditProps = (postID, postList) => {
    postList.forEach((post, index, array) => {
        if (post.postID === postID) {
            array[index]['editText'] = !array[index]['editText']
            console.log('changed')
        }
    })
    return postList
}

export default changeEditProps;