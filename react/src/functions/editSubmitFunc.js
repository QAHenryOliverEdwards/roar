import sleep from "./sleep";

const editSubmitFunc = async (postBody, postID, forceReloadFunc) => {
    let postObj = {
        'body': postBody,
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
        await sleep(500)
        forceReloadFunc()
    } else {
        console.log('Update failed')
    }
}

export default editSubmitFunc;