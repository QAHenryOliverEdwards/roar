import Post from "./Post";
import Reply from "./Reply";

const PostsTable = (props) => {

    const {postDictionary} = props;

    const elementArray = [];

    const makePostElement = () => {
        
        const getPost = (ID) => {
            for (let post in postDictionary) {
                if (postDictionary[post].postID === ID) {
                    return {
                        'postID': postDictionary[post].postID,
                        'name': postDictionary[post].name,
                        'body': postDictionary[post].body
                    }
                }
            }
        }

        let maxLevel = 0;

        const getMaxLevel = () => {
            postDictionary.forEach((post) => {
                let a = 0;
                let b = post.postID;
                if (b > a) {
                    maxLevel = b;
                }
                a = b;
            })
        }

        getMaxLevel();

        const removePosts = (posts) => {
            postDictionary.forEach((post, index, postDictionary)=>{
                if (posts.includes(post.postID)) {
                    postDictionary.splice(index, 1);
                }
            })
        }

        const constructChildren = (children, parentID) => {
            let postsToRemove = [];
            children.forEach((replyObj) => {
                if (replyObj.pID === parentID) {
                    let match = getPost(replyObj.cID);
                    match.level = replyObj.level;
                    elementArray.push(<Reply post={match} key={replyObj.cID}/>);
                    postsToRemove.push(replyObj.cID);
                }
            })
            removePosts(postsToRemove);
        }

        postDictionary.forEach((post, index, postDictionary) => {
            let fp = getPost(post.postID);
            elementArray.push(<Post post={fp} key={post.postID}/>);
            let initialParentID = post.postID;
            while (initialParentID <= maxLevel) {
                constructChildren(post.childrenID, initialParentID);
                initialParentID += 1;
            }
            // postDictionary.splice(index, 1);
        })

        return elementArray;
    }


    return (
        <div>
            {makePostElement()}
        </div>
    )
}

export default PostsTable;