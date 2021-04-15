const constructPostDictionary =(allUsers)=>{
    const postDictionaryList = [];
    allUsers.forEach((user)=>{
        user.posts.forEach((post)=>{
            let postItem = {
                'userID': user.id,
                'postID': post.id,
                'name': user.name,
                'body': post.body,
                'childrenID': []
            }
            const searchChildren3 =(parent, children, recursionLevel)=>{
                if (Array.isArray(children) && (children.length !== 0)) {
                    children.forEach((child)=>{
                        console.log(child)
                        let childUserID = findUserIDWithPostID(child.id, allUsers)
                        postItem.childrenID.push({pID: parent.id, cID: child.id, uID: childUserID, level: recursionLevel});
                        recursionLevel += 1;
                        return searchChildren3(child, child.children, recursionLevel);
                    })
                } else {
                    return postItem;
                }
            }
            searchChildren3(post, post.children, 1);
            postDictionaryList.push(postItem);
        })
    })
    return postDictionaryList;
}

const findUserIDWithPostID =(postID, userList)=>{
    for (let user in userList) {
        let currentUser = userList[user]
        for (let post in userList[user]['posts']) {
            let currentPost = userList[user]['posts'][post]
            if (currentPost.id === postID) {
                return currentUser.id
            }
        }
    }
}

export default constructPostDictionary;