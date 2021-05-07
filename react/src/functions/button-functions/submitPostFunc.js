import getUserIDFunc from "../getUserIDFunc";

const submitPostFunc = async (postBody, forceReloadFunc)=>{

    let auth = sessionStorage.getItem('auth-roar')
    let userID = await getUserIDFunc(auth)

    let postObj = {
        'body': postBody,
        'visibility': true,
        'user': {
            'id': userID
        }
    }

    let response = await fetch('http://127.0.0.1:8082/posts/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(postObj)
    })

    if (response.status === 201) {
        console.log('Post Successful')
        forceReloadFunc()
    } else {
        console.log('Post Unsuccessful')
    }
}

export default submitPostFunc;