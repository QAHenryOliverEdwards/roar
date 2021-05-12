import Post from "./Post";
import {useCallback, useEffect, useState} from "react";
import changeEditProps from "../../functions/button-functions/setEditFunc";
import PostEdit from "./PostEdit";
import PostHidden from "./PostHidden";

const PostTable = (props) => {

    const {postDictionary, forceReload} = props;

    const [postsToDisplay, setPostsToDisplay] = useState([])

    const signalChangeReplyBox = useCallback((postID) => {
        let temp = changeEditProps(postID, postDictionary)
        constructPosts(temp)
    }, [postDictionary])

    const constructPosts = useCallback((newPostDictionary) => {
        const tempPosts = []
        newPostDictionary.forEach((post) => {
            console.log(post)
            if (post.editText === false) {
                if (post.visibility === true) {
                    tempPosts.push(<Post postProps={post} key={post.postID}
                                         setReplyFunc={signalChangeReplyBox} forceReload={forceReload}/>)
                } else if (post.visibility === false) {
                    tempPosts.push(<PostHidden postProps={post} key={post.postID}
                                               forceReload={forceReload}/>)
                }
            } else if (post.editText === true) {
                tempPosts.push(<PostEdit postProps={post} key={post.postID}
                                         setReplyFunc={signalChangeReplyBox} forceReload={forceReload}/>)
            }
        })
        setPostsToDisplay(tempPosts)
    }, [signalChangeReplyBox])

    useEffect(() => {
        constructPosts(postDictionary)
    }, [constructPosts])

    return (
        <div>
            {postsToDisplay}
        </div>
    )
}

export default PostTable;