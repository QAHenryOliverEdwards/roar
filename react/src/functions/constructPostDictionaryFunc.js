import addEditProp from "./post-functionality/addEditProp";

const constructPostDictionaryFunc = (users, posts, setPostDictionary) => {
    let temp = initialSetup(posts)
    temp = removeDuplicates(temp)
    temp = addUserInfo(temp, users)
    temp = addEditProp(temp)
    setPostDictionary(temp)
}

const initialSetup = (posts) => {
    const initialList = []
    posts.forEach((post) => {
        let postItem = {
            'userID': 'none',
            'postID': post.id,
            'parentID': 'none',
            'name': 'none',
            'body': post.body,
            'recursion-level': 0
        }
        initialList.push(postItem)
        const searchChildren = (parent, children, recursionLevel) => {
            if (Array.isArray(children) && (children.length !== 0)) {
                recursionLevel += 1
                children.forEach((child) => {
                    let childItem = {
                        'userID': 'none',
                        'postID': child.id,
                        'parentID': parent.id,
                        'name': 'none',
                        'body': child.body,
                        'recursion-level': recursionLevel
                    }
                    initialList.push(childItem)
                    return searchChildren(child, child.children, recursionLevel)
                })
            }
        }
        searchChildren(post, post.children, 0)
    })
    return initialList
}

const removeDuplicates = (initialList) => {
    let removedList = []
    let usedID = []
    initialList.forEach((item) => {
        if (!usedID.includes(item.postID)) {
            removedList.push(item)
            usedID.push(item.postID)
        }
    })
    return removedList
}

const addUserInfo = (postList, users) => {
    if (users.length !== 0) {
        postList.forEach((post, index, array) => {
            let user = lookupPost(post, users)
            array[index]['userID'] = user.id
            array[index]['name'] = user.name
        })
    }
    return postList
}

const lookupPost = (post, users) => {
    let postID = post.postID
    for (let user in users) {
        let currentUser = users[user]
        for (let post in users[user]['posts']) {
            let currentPost = users[user]['posts'][post]
            if (currentPost.id === postID) {
                return currentUser
            }
        }
    }
}


export default constructPostDictionaryFunc;