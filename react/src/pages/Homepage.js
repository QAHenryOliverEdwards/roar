import {useCallback, useEffect, useState} from "react";
import constructPostDictionaryFunc from "../functions/constructPostDictionaryFunc"
import PostTable from "../components/homepage/PostTable";
import PostCreate from "../components/homepage/PostCreate";

const Homepage = (props) => {

    const {loggedIn} = props;

    const [allUsers, setAllUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [postDictionary, setPostDictionary] = useState([]);

    const getAllUsers = useCallback(async () => {
        if (!allUsers.length) {
            let response = await fetch('http://127.0.0.1:8082/users/read')
            let allUsersResponse = await response.json()
            setAllUsers(allUsersResponse)
        }
    }, [allUsers.length])

    const getAllPosts = useCallback(async () => {
        if (!allPosts.length) {
            let response = await fetch('http://127.0.0.1:8082/posts/read')
            let allPostsResponse = await response.json()
            setAllPosts(allPostsResponse)
        }
    }, [allPosts.length])

    const constructPageAndPosts = useCallback(async () => {
        await getAllUsers()
        await getAllPosts()
        await constructPostDictionaryFunc(allUsers, allPosts, setPostDictionary)
    }, [getAllUsers, getAllPosts, allUsers, allPosts])

    useEffect(() => {
        constructPageAndPosts()
    }, [constructPageAndPosts])
    
    const forceReload = useCallback(async ()=>{
        setAllUsers([])
        setAllPosts([])
        constructPageAndPosts()
    }, [constructPageAndPosts])

    if (loggedIn === true) {
        return (
            <div>
                <h1 className={'title'}>Welcome to Roar</h1>
                <PostCreate forceReload={forceReload}/>
                <PostTable postDictionary={postDictionary} forceReload={forceReload}/>
            </div>
        )
    } else if (loggedIn === false) {
        return (
            <div>
                <h1 className={'title'}>Welcome to Roar</h1>
                <PostTable postDictionary={postDictionary} forceReload={forceReload}/>
            </div>
        )
    }
}

export default Homepage;