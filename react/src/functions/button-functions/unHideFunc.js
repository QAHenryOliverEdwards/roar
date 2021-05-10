const unHideFunc = async (postID, forceReloadFunc)=>{

    let postObj = {
        'visibility': true
    }

    let response = await fetch(`http://127.0.0.1:8082/posts/update/${postID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(postObj)
    })

    if (response.status === 202) {
        console.log('UnHide was Successful')
        forceReloadFunc()
    } else {
        console.log('Hide failed')
    }
}

export default unHideFunc;