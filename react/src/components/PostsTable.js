import Post from "./Post";
import Reply from "./Reply";
import {useCallback, useEffect, useState} from "react";
import getUserID from "../functions/getUserID";

const PostsTable = (props) => {

    const {postDictionary, reloadPosts} = props;

    const [elementArray, setElementArray] = useState([]);
    const [replyBox, setReplyBox] = useState([]);
    const [currentPostDictionary, setCurrentPostDictionary] = useState([]);
    const [selfEdit, setSelfEdit] = useState([]);

    const pushPostDictionaryChanges = useCallback(() => {
        setCurrentPostDictionary(postDictionary)
    }, [postDictionary])

    const changeSelfReplyBox = useCallback((selfReplyToChange) => {
        const toApply = [];
        if (!selfReplyToChange) {
            for (let post in postDictionary) {
                let currentPost = postDictionary[post];
                let thisReply = {
                    'postID': currentPost.postID,
                    'isEditBox': false
                }
                toApply.push(thisReply);
            }
            setSelfEdit(toApply);
        } else if (selfReplyToChange) {
            for (let post in postDictionary) {
                let currentPost = postDictionary[post];
                if (selfReplyToChange !== currentPost.postID) {
                    let thisReply = {
                        'postID': currentPost.postID,
                        'isEditBox': false
                    }
                    toApply.push(thisReply);
                } else if (selfReplyToChange === currentPost.postID) {
                    let thisReply = {
                        'postID': currentPost.postID,
                        'isEditBox': true,
                        'boxText': ''
                    }
                    toApply.push(thisReply);
                }
            }
            setSelfEdit(toApply)
        }
    }, [postDictionary])

    const changeSpecificSelfReply = useCallback((postID, event) => {
        for (let edit in selfEdit) {
            let currentEdit = selfEdit[edit];
            if (currentEdit.postID === postID) {
                currentEdit.boxText = event.target.value;
                console.log(currentEdit.boxText);
            }
        }
    }, [selfEdit])

    const submitEdit = useCallback(async (postID) => {
        let editObj;
        let auth = sessionStorage.getItem('auth-roar');
        let userID = await getUserID(auth);
        for (let edit in selfEdit) {
            let currentEdit = selfEdit[edit]
            if (currentEdit.postID === postID) {
                editObj = {
                    'body': currentEdit.boxText,
                }
            }
        }

        let response = await fetch(`http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/posts/update/${postID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editObj)
        })

        if (response.status === 202) {
            console.log('Update successful!')
            let newEditBoxList = []
            for (let edit in selfEdit) {
                let currentEdit = selfEdit[edit]
                if (currentEdit.postID == postID) {
                    currentEdit.isEditBox = false
                }
                newEditBoxList.push(currentEdit)
            }
            reloadPosts()
        } else {
            console.log('Update failed!');
        }
    }, [selfEdit])

    const deletePost = useCallback(async (postID) => {
            let response = await fetch(`http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/posts/delete/${postID}`, {
                method: 'DELETE',
            })
            if (response.status === 204) {
                console.log('Delete successful')
                reloadPosts()
            } else {
                console.log('Delete unsuccessful')
            }
        }
        , [])

    const changeReplyBox = useCallback((replyToChange) => {
        const toApply = [];
        if (!replyToChange) {
            for (let post in postDictionary) {
                let currentPost = postDictionary[post];
                let thisReply = {
                    'postID': currentPost.postID,
                    'isBox': false
                }
                toApply.push(thisReply);
            }
            setReplyBox(toApply);
        } else if (replyToChange) {
            for (let post in postDictionary) {
                let currentPost = postDictionary[post];
                if (replyToChange !== currentPost.postID) {
                    let thisReply = {
                        'postID': currentPost.postID,
                        'isBox': false
                    }
                    toApply.push(thisReply);
                } else if (replyToChange === currentPost.postID) {
                    let thisReply = {
                        'postID': currentPost.postID,
                        'isBox': true,
                        'boxText': '',
                    }
                    toApply.push(thisReply);
                }
            }
            setReplyBox(toApply);
        }
    }, [postDictionary])

    const changeSpecificReplyBox = useCallback((postID, event) => {
        for (let reply in replyBox) {
            let currentReply = replyBox[reply];
            if (currentReply.postID === postID) {
                currentReply.boxText = event.target.value;
                console.log(currentReply.boxText);
            }
        }
    }, [replyBox])

    const submitReply = useCallback(async (postID) => {
        let replyObj = {};
        let auth = sessionStorage.getItem('auth-roar');
        let userID = await getUserID(auth);
        for (let reply in replyBox) {
            let currentReply = replyBox[reply];
            if (currentReply.postID === postID) {
                replyObj = {
                    'body': currentReply.boxText,
                    'visibility': true,
                    'user': {
                        'id': userID
                    },
                    'parent': {
                        'id': postID
                    }
                }
            }
        }

        let response = await fetch('http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(replyObj)
        })

        if (response.status === 201) {
            console.log('Reply successful')
            let newReplyBoxList = [];
            for (let replyBoxObj in replyBox) {
                let currentReply = replyBox[replyBoxObj];
                if (currentReply.postID == postID) {
                    currentReply.isBox = false
                }
                newReplyBoxList.push(currentReply)
            }
            setReplyBox(newReplyBoxList)
            reloadPosts()
        } else {
            console.log('Reply failed')
        }
    }, [replyBox])

    const makePostElement = useCallback(async () => {

        const auth = sessionStorage.getItem('auth-roar');
        const userID = await getUserID(auth);

        const newElementArray = [];

        let ignore = [];

        const getPost = (ID) => {
            for (let post in currentPostDictionary) {
                if (currentPostDictionary[post].postID === ID) {
                    return {
                        'postID': currentPostDictionary[post].postID,
                        'name': currentPostDictionary[post].name,
                        'body': currentPostDictionary[post].body
                    }
                }
            }
        }

        let maxLevel = 0;

        const getMaxLevel = () => {
            currentPostDictionary.forEach((post) => {
                let a = 0;
                let b = post.postID;
                if (b > a) {
                    maxLevel = b;
                }
                a = b;
            })
        }

        getMaxLevel();

        // const removePosts = (posts) => {
        //     // currentPostDictionary.forEach((post, index, currentPostDictionary) => {
        //     //     if (posts.includes(post.postID)) {
        //     //         setCurrentPostDictionary(currentPostDictionary.splice(index, 1));
        //     //     }
        //     // })
        //     for (let post in currentPostDictionary) {
        //         let thisPost = currentPostDictionary[post];
        //         if (posts.includes(thisPost.postID)) {
        //             setCurrentPostDictionary(currentPostDictionary.splice(post, 1));
        //         }
        //     }
        // }

        const constructChildren = (children, parentID) => {
            let postsToIgnore = [];
            for (let child in children) {
                let currentChild = children[child];
                if (currentChild.pID === parentID) {
                    let match = getPost(currentChild.cID);
                    match.level = currentChild.level;
                    let selfEditObj = {};
                    selfEdit.forEach((editObj) => {
                        if (match.postID === editObj.postID) {
                            selfEditObj = editObj;
                        }
                    })
                    let replyPropObj = {};
                    replyBox.forEach((replyProp) => {
                        if (match.postID === replyProp.postID) {
                            replyPropObj = replyProp;
                        }
                    })
                    if (currentChild.uID == userID) {
                        newElementArray.push(<Reply post={match} key={currentChild.cID}
                                                    selfEditBoxProps={selfEditObj} editBoxFunc={changeSelfReplyBox}
                                                    setSelfEditBoxText={changeSpecificSelfReply}
                                                    submitEditFunc={submitEdit} deleteFunc={deletePost}
                                                    editButtons={true} replyBoxProps={replyPropObj}
                                                    replyBoxFunc={changeReplyBox}
                                                    setReplyBoxText={changeSpecificReplyBox}
                                                    submitReplyFunc={submitReply}/>);
                    } else {
                        newElementArray.push(<Reply post={match} key={currentChild.cID}
                                                    selfEditBoxProps={selfEditObj} editBoxFunc={changeSelfReplyBox}
                                                    setSelfEditBoxText={changeSpecificSelfReply}
                                                    submitEditFunc={submitEdit} deleteFunc={deletePost}
                                                    editButtons={false} replyBoxProps={replyPropObj}
                                                    replyBoxFunc={changeReplyBox}
                                                    setReplyBoxText={changeSpecificReplyBox}
                                                    submitReplyFunc={submitReply}/>);
                    }

                    postsToIgnore.push(currentChild.cID);
                }
            }
            return postsToIgnore;
        }


        const constructPostDictionary = () => {
            // currentPostDictionary.forEach((post, index, currentPostDictionary) => {
            //     let fp = getPost(post.postID);
            //     let replyPropObj = {};
            //     replyBox.forEach((replyProp) => {
            //         if (fp.postID === replyProp.postID) {
            //             replyPropObj = replyProp;
            //         }
            //     })
            //     newElementArray.push(<Post post={fp} key={fp.postID} replyBoxProps={replyPropObj}
            //                             replyBoxFunc={changeReplyBox} setReplyBoxText={changeSpecificReplyBox}
            //                             submitReplyFunc={submitReply}/>);
            //     let initialParentID = post.postID;
            //     while (initialParentID <= maxLevel) {
            //         constructChildren(post.childrenID, initialParentID);
            //         initialParentID += 1;
            //     }
            // })
            for (let post in currentPostDictionary) {
                let thisPost = currentPostDictionary[post];
                if (!ignore.includes(thisPost.postID)) {
                    let fp = getPost(thisPost.postID);
                    let replyPropObj = {};
                    replyBox.forEach((replyProp) => {
                        if (fp.postID === replyProp.postID) {
                            replyPropObj = replyProp;
                        }
                    })
                    let selfEditObj = {};
                    selfEdit.forEach((editObj) => {
                        if (fp.postID === editObj.postID) {
                            selfEditObj = editObj;
                        }
                    })
                    if (userID == thisPost.userID) {
                        newElementArray.push(<Post post={fp} key={fp.postID} replyBoxProps={replyPropObj}
                                                   replyBoxFunc={changeReplyBox}
                                                   setReplyBoxText={changeSpecificReplyBox}
                                                   submitReplyFunc={submitReply} selfEditBoxProps={selfEditObj}
                                                   editBoxFunc={changeSelfReplyBox}
                                                   setSelfEditBoxText={changeSpecificSelfReply}
                                                   submitEditFunc={submitEdit} deleteFunc={deletePost}
                                                   editButtons={true}/>);
                    } else {
                        newElementArray.push(<Post post={fp} key={fp.postID} replyBoxProps={replyPropObj}
                                                   replyBoxFunc={changeReplyBox}
                                                   setReplyBoxText={changeSpecificReplyBox}
                                                   submitReplyFunc={submitReply} selfEditBoxProps={selfEditObj}
                                                   editBoxFunc={changeSelfReplyBox}
                                                   setSelfEditBoxText={changeSpecificSelfReply}
                                                   submitEditFunc={submitEdit} deleteFunc={deletePost}
                                                   editButtons={false}/>);
                    }
                    let initialParentID = thisPost.postID;
                    while (initialParentID <= maxLevel) {
                        ignore = ignore.concat(constructChildren(thisPost.childrenID, initialParentID));
                        initialParentID += 1;
                    }
                }
            }
        }

        constructPostDictionary();

        setElementArray(newElementArray);

    }, [changeReplyBox, changeSpecificReplyBox, postDictionary, replyBox, submitReply, changeSelfReplyBox,
        changeSpecificSelfReply, selfEdit])

    useEffect(() => {
        pushPostDictionaryChanges()
    }, [pushPostDictionaryChanges])

    useEffect(() => {
        changeReplyBox()
    }, [changeReplyBox])

    useEffect(() => {
        changeSelfReplyBox()
    }, [changeSelfReplyBox])

    useEffect(() => {
        makePostElement()
    }, [makePostElement])

    // const makePostElement = () => {
    //
    //     const getPost = (ID) => {
    //         for (let post in postDictionary) {
    //             if (postDictionary[post].postID === ID) {
    //                 return {
    //                     'postID': postDictionary[post].postID,
    //                     'name': postDictionary[post].name,
    //                     'body': postDictionary[post].body
    //                 }
    //             }
    //         }
    //     }
    //
    //     let maxLevel = 0;
    //
    //     const getMaxLevel = () => {
    //         postDictionary.forEach((post) => {
    //             let a = 0;
    //             let b = post.postID;
    //             if (b > a) {
    //                 maxLevel = b;
    //             }
    //             a = b;
    //         })
    //     }
    //
    //     getMaxLevel();
    //
    //     const removePosts = (posts) => {
    //         postDictionary.forEach((post, index, postDictionary) => {
    //             if (posts.includes(post.postID)) {
    //                 postDictionary.splice(index, 1);
    //             }
    //         })
    //     }
    //
    //     const constructChildren = (children, parentID) => {
    //         let postsToRemove = [];
    //         children.forEach((replyObj) => {
    //             if (replyObj.pID === parentID) {
    //                 let match = getPost(replyObj.cID);
    //                 match.level = replyObj.level;
    //                 elementArray.push(<Reply post={match} key={replyObj.cID}/>);
    //                 postsToRemove.push(replyObj.cID);
    //             }
    //         })
    //         removePosts(postsToRemove);
    //     }
    //
    //
    //     const constructPostDictionary = () => {
    //         postDictionary.forEach((post, index, postDictionary) => {
    //             let fp = getPost(post.postID);
    //             let replyPropObj = {};
    //             replyBox.forEach((replyProp) => {
    //                 if (fp.postID === replyProp.postID) {
    //                     replyPropObj = replyProp;
    //                 }
    //             })
    //             elementArray.push(<Post post={fp} key={fp.postID} replyBoxProps={replyPropObj}
    //                                     replyBoxFunc={changeReplyBox} setReplyBoxText={changeSpecificReplyBox}
    //             submitReplyFunc={submitReply}/>);
    //             let initialParentID = post.postID;
    //             while (initialParentID <= maxLevel) {
    //                 constructChildren(post.childrenID, initialParentID);
    //                 initialParentID += 1;
    //             }
    //             // postDictionary.splice(index, 1);
    //         })
    //     }
    //
    //     constructPostDictionary();
    //
    //     return elementArray;
    // }

    return (
        <div>
            {elementArray}
        </div>
    )
}

export default PostsTable;