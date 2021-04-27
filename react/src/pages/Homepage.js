import {useCallback, useEffect, useState} from "react";
import constructPostDictionaryFunc from "../functions/constructPostDictionaryFunc"
import {Button} from "react-bootstrap";
import PostTable from "../components/homepage/PostTable";

const Homepage = () => {

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

    return (
        <div>
            <h1>Homepage</h1>
            <PostTable postDictionary={postDictionary} forceReload={forceReload}/>
        </div>
    )
}

export default Homepage;