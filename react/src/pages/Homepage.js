import {useCallback, useEffect, useState} from "react";
import Title from "../coponents/Title";
import Topbar from "../coponents/Topbar";
import constructPostDictionary from "../functions/constructPostDictionary";
import PostsTable from "../coponents/PostsTable";

const Homepage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [postDictionary, setPostDictionary] = useState([]);
    const [searchText, setSearchText] = useState('');

    const getAllUsers = useCallback(async () => {
        if (!allUsers.length) {
            let response = await fetch('http://127.0.0.1:8082/users/read');
            let allUsers = await response.json();
            setAllUsers(allUsers);
        }
    }, [allUsers.length]);

    const constructAllPosts = useCallback(() => {
        let postDictionary = constructPostDictionary(allUsers);
        if (postDictionary.length) {
            setPostDictionary(postDictionary);
        } else {
            setPostDictionary([]);
        }
    }, [allUsers]);

    const constructPage = useCallback(async () => {
        await getAllUsers();
        await constructAllPosts();
    }, [constructAllPosts, getAllUsers]);

    const handleInputText = (event) => {
        setSearchText(event.target.value);
    }

    const constructSearch = () => {
        constructAllPosts();
    }

    useEffect(() => {
        constructPage();
    }, [constructPage])

    return (
        <div className={'container-fluid mt-3'}>
            <Title/>
            <Topbar userInputFunc={handleInputText} searchFunc={constructSearch}/>
            <PostsTable postDictionary={postDictionary}/>
        </div>
    )
}

export default Homepage;