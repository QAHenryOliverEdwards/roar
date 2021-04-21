import {useCallback, useEffect, useState} from "react";
import Title from "../components/Title";
import Searchbar from "../components/Searchbar";
import constructPostDictionary from "../functions/constructPostDictionary";
import PostsTable from "../components/PostsTable";
import LogoutButton from "../components/LogoutButton";
import MakePost from "../components/MakePost";
import getUserID from "../functions/getUserID";

const Homepage = (props) => {

    const {setLogoutFunc} = props;

    const [allUsers, setAllUsers] = useState([]);
    const [postDictionary, setPostDictionary] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [postText, setPostText] = useState('');

    const getAllUsers = useCallback(async () => {
        if (!allUsers.length) {
            let response = await fetch('http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/users/read');
            let allUsers = await response.json();
            setAllUsers(allUsers);
        }
    }, [allUsers]);

    const constructAllPosts = useCallback(() => {
        let newPostDictionary = constructPostDictionary(allUsers);
        if (newPostDictionary.length) {
            setPostDictionary(newPostDictionary);
        } else {
            setPostDictionary([]);
        }
    }, [allUsers]);

    const constructPage = useCallback(() => {
        getAllUsers();
        constructAllPosts();
    }, [constructAllPosts, getAllUsers]);

    const submitPost = useCallback(async () => {
        let auth = sessionStorage.getItem('auth-roar');
        let userID = await getUserID(auth);
        let postObj = {
            'body': postText,
            'visibility': true,
            'user': {
                'id': userID
            }
        }
        let postResponse = await fetch('http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)
        })

        if (postResponse.status === 201) {
            let response = await fetch('http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/users/read');
            let allUsers = await response.json();
            setAllUsers(allUsers);
            console.log('Post successful')
            // Method for just adding the post to the page instead of doing a reload
            // not currently working
            // let post = await postResponse.json()
            // let postDictionaryItem = await constructOnePost(post);
            // let newPostDictionary = postDictionary
            // newPostDictionary.push(postDictionaryItem)
            // setPostDictionary(newPostDictionary);
        } else {
            console.log('Post unsuccessful')
        }
    }, [postText])

    const handleInputText = (event) => {
        setSearchText(event.target.value);
    }

    const handlePostText = (event) => {
        if (event.type === 'click') {
            setPostText('');
        } else {
            setPostText(event.target.value);
        }
    }

    const resetAllUsers = async () => {
        let response = await fetch('http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/users/read');
        let allUsers = await response.json();
        setAllUsers(allUsers);
    }

    const constructSearch = () => {
        const searchedPosts = []
        if (searchText === '') {
            constructPage();
        }
        postDictionary.forEach((post) => {
            if (post.body.toLowerCase().includes(searchText.toLowerCase())) {
                searchedPosts.push(post)
            }
        })
        setPostDictionary(searchedPosts)
    }

    useEffect(() => {
        constructPage();
    }, [constructPage])

    return (
        <div className={'container-fluid mt-3 col-lg-6 col-sm-12'}>
            <div className={'row'}>
                <Title/>
                <LogoutButton setLogoutFunc={setLogoutFunc}/>
                <MakePost setPostText={handlePostText} submitPostFunc={submitPost}/>
            </div>
            <div className={'row'}>
                <Searchbar userInputFunc={handleInputText} searchFunc={constructSearch}/>
                <PostsTable postDictionary={postDictionary} reloadPosts={resetAllUsers}/>
            </div>
        </div>
    )
}

export default Homepage;