const constructPostDictionary =(allUsers)=>{
    const postDictionaryList = [];
    allUsers.forEach((user)=>{
        user.posts.forEach((post)=>{
            let postItem = {
                'postID': post.id,
                'name': user.name,
                'body': post.body,
                'childrenID': []
            }
            const searchChildren3 =(parent, children, recursionLevel)=>{
                if (Array.isArray(children) && (children.length !== 0)) {
                    children.forEach((child)=>{
                        postItem.childrenID.push({pID: parent.id, cID: child.id, level: recursionLevel});
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

export default constructPostDictionary;