const deleteFunc = async (postID) => {
    console.log(postID)
    let response = await fetch(`http://127.0.0.1:8082/posts/delete/${postID}`, {
        method: 'DELETE'
    })

    if (response.status === 204) {
        console.log('Delete Successful')
    } else {
        console.log('Delete Unsuccessful')
    }

    return response.status
}

export default deleteFunc;