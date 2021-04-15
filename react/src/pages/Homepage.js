import {useCallback, useEffect, useState} from "react";
import Title from "../coponents/Title";
import Searchbar from "../coponents/Searchbar";
import constructPostDictionary from "../functions/constructPostDictionary";
import PostsTable from "../coponents/PostsTable";
import LogoutButton from "../coponents/LogoutButton";
import MakePost from "../coponents/MakePost";
import getUserID from "../functions/getUserID";

const Homepage = (props) => {

    const {setLogoutFunc} = props;

    const [allUsers, setAllUsers] = useState([]);
    const [postDictionary, setPostDictionary] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [postText, setPostText] = useState('');

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

    const submitPost = useCallback(async ()=>{
        let auth = sessionStorage.getItem('auth-roar');
        let userID = await getUserID(auth);
        let postObj = {
            'body': postText,
            'visibility': true,
            'user': {
                'id': userID
            }
        }
        let postResponse = await fetch('http://127.0.0.1:8082/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)
        })

        if (postResponse.status === 201) {
            console.log('Post successful')
        } else {
            console.log('Post unsuccessful')
        }
    }, [postText])

    const handleInputText = (event) => {
        setSearchText(event.target.value);
    }

    const handlePostText =(event)=>{
        setPostText(event.target.value);
    }

    const constructSearch = () => {
        const searchedPosts = []
        if (searchText === '') {
            constructPage();
        }
        postDictionary.forEach((post)=>{
            if (post.body.toLowerCase().includes(searchText.toLowerCase())) {
                searchedPosts.push(post)
            }
        })
        setPostDictionary(searchedPosts)
    }

    useEffect(() => {
        constructPage();
    }, [constructPage, postText])

    return (
        <div className={'container-fluid mt-3 col-lg-6 col-sm-12'}>
            <div className={'row'}>
                <Title/>
                <LogoutButton setLogoutFunc={setLogoutFunc}/>
                <MakePost setPostText={handlePostText} submitPostFunc={submitPost}/>
            </div>
            <div className={'row'}>
                <Searchbar userInputFunc={handleInputText} searchFunc={constructSearch}/>
                <PostsTable postDictionary={postDictionary}/>
            </div>
        </div>
    )
}

export default Homepage;