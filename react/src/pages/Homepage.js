import {useCallback, useEffect, useState} from "react";
import Title from "../coponents/Title";
import Searchbar from "../coponents/Searchbar";
import constructPostDictionary from "../functions/constructPostDictionary";
import PostsTable from "../coponents/PostsTable";
import LogoutButton from "../coponents/LogoutButton";

const Homepage = (props) => {

    const {setLogoutFunc} = props;

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
        let newPostDictionary = constructPostDictionary(allUsers);
        if (newPostDictionary.length) {
            setPostDictionary(newPostDictionary);
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
        console.log('feature coming soon');
        // constructAllPosts();
    }

    useEffect(() => {
        constructPage();
    }, [constructPage, searchText])

    return (
        <div className={'container-fluid mt-3 col-lg-6 col-sm-12'}>
            <div className={'row'}>
                <Title/>
                <LogoutButton setLogoutFunc={setLogoutFunc}/>
            </div>
            <div className={'row'}>
                <Searchbar userInputFunc={handleInputText} searchFunc={constructSearch}/>
                <PostsTable postDictionary={postDictionary}/>
            </div>
        </div>
    )
}

export default Homepage;