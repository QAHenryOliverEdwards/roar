import Topbar from "./coponents/Topbar";
import {useEffect, useState} from "react";
import UserPostTable from "./coponents/UserPostTable";
import './css/bootstrap.css';
import userSearchFunc from "./functions/userSearchFunc";
import './css/roar.css'
import './css/fonts.css';
import Title from "./coponents/Title";

const App = () => {

    const [users, setUsers] = useState([]);
    const [usersToDisplay, setUsersToDisplay] = useState([]);
    const [searchText, setSearchText] = useState('');

    const getUsers = async () => {
        let allPosts = await fetch('http://127.0.0.1:8082/users/read').then((response) => {
            return response.json();
        })
        setUsers(allPosts);
        setUsersToDisplay(allPosts);
    }

    const handleInputText =(event)=>{
        setSearchText(event.target.value);
    }

    const constructSearch =()=>{
        const searchedUsers = userSearchFunc(users, searchText);
        setUsersToDisplay(searchedUsers);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className={'container-fluid mt-3'}>
            <div>
                <Title/>
                <Topbar userInputFunc={handleInputText} searchFunc={constructSearch}/>
                <UserPostTable users={usersToDisplay}/>
            </div>
        </div>
    )
}

export default App;
