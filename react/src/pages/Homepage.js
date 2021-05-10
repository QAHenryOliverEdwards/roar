import {useCallback, useEffect, useState} from "react";
import constructPostDictionaryFunc from "../functions/construct-post-dictionary-functions/constructPostDictionaryFunc"
import PostTable from "../components/homepage/PostTable";
import PostCreate from "../components/homepage/PostCreate";
import getUserIDFunc from "../functions/getUserIDFunc";

const Homepage = (props) => {

    const {loggedIn} = props;

    const [allUsers, setAllUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [postDictionary, setPostDictionary] = useState([]);
    const [updatePostDictionary, setUpdatePostDictionary] = useState([]);
    const [userID, setUserID] = useState(0);

    // Getting and setting userID for setup purposes (if logged in)
    const getAndSetUserID = useCallback(async ()=>{
        let auth = sessionStorage.getItem('auth-roar')
        let getUserID = await getUserIDFunc(auth)
        getUserID = parseInt(getUserID, 10)
        setUserID(getUserID)
    }, [])

    // Calling userID function if logged in
    if (loggedIn) {
        getAndSetUserID()
    }

    // Initial setup functions
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
        await constructPostDictionaryFunc(allUsers, allPosts, userID, setPostDictionary)
    }, [getAllUsers, getAllPosts, allUsers, allPosts, userID])

    useEffect(() => {
        constructPageAndPosts()
    }, [constructPageAndPosts])

    // Update Functions
    const updateFunc = useCallback(async() =>{

        let updateAllUsers = []
        while (!updateAllUsers.length) {
            let response = await fetch('http://127.0.0.1:8082/users/read')
            updateAllUsers = await response.json()
        }

        let updateAllPosts = []
        while (!updateAllPosts.length) {
            let response = await fetch('http://127.0.0.1:8082/posts/read')
            updateAllPosts = await response.json()
        }

        await constructPostDictionaryFunc(updateAllUsers, updateAllPosts, userID, setUpdatePostDictionary)

        console.log(postDictionary.length)
        console.log(updatePostDictionary.length)

        if (postDictionary.length !== updatePostDictionary.length) {
            console.log('Refresh to get new posts')
        } else {
            console.log('No new updates')
        }
    }, [postDictionary.length, updatePostDictionary.length, userID])

    useEffect(()=>{
        const update = setInterval(updateFunc, 3000)
        return ()=> clearInterval(update)
    })

    // Force page reload function
    const forceReload = useCallback(async ()=>{
        setAllUsers([])
        setAllPosts([])
        constructPageAndPosts()
    }, [constructPageAndPosts])

    if (loggedIn === true) {
        return (
            <div>
                <h1 className={'title text-center'}>Welcome to Roar</h1>
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