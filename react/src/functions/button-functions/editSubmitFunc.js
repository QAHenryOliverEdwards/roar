import sleep from "../sleep";

const editSubmitFunc = async (postBody, postID, forceReloadFunc) => {
    let postObj = {
        'body': postBody,
    }

    let response = await fetch(`http://192.168.1.101:8082/posts/update/${postID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(postObj)
    })

    if (response.status === 202) {
        console.log('Update succeeded')
        forceReloadFunc()
    } else {
        console.log('Update failed')
    }
}

export default editSubmitFunc;