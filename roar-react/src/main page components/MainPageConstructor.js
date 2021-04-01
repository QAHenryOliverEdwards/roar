import {UserPost} from "./UserPost";
import {useEffect, useState} from "react";
import {PostTable} from "./PostTable";
import {Topbar} from "./Topbar/Topbar";

export const MainPageConstructor =()=>{

    const [posts, setPosts] = useState([]);
    const [names, setNames] = useState([]);
    const [searchText, setSearchText] = useState(``);

    const getPosts = async()=>{
        const allPosts = await getAllPosts();
        setPosts([allPosts]);
    }

    const getNames = async()=>{
        const allNames = await getAllNames();
        setNames([allNames]);
    }

    const searchEvent =(event)=>{
        console.log(event.target.type);
        if (event.target.type === `search`) {
            setSearchText(event.target.value);
        }

    }

    useEffect(()=>{
        setTimeout(()=>{
            getPosts();
            getNames();
        }, 5000)
    })

    return(
        <div>
            <Topbar searchText={searchText} searchEvent={searchEvent}/>
            <PostTable name={names} post={posts}/>
        </div>
    )
}

const getAllPosts = async ()=>{
    let allPosts;
    await fetch('http://127.0.0.1:8082/posts/read')
        .then((response)=>{
            return response.json();
        }).then((responseData)=>{
            allPosts = responseData;
        })
    return allPosts;
}

const getAllNames = async ()=>{
    let postNames = [];
    let allPosts = await getAllPosts();
    for (let id in allPosts) {
        let postID = allPosts[id]['id'];
        await fetch(`http://127.0.0.1:8082/users/read/${postID}`)
            .then((response)=>{
                return response.json();
            }).then((responseData)=>{
                postNames.push(responseData['name'])
            })
    }
    return postNames;
}