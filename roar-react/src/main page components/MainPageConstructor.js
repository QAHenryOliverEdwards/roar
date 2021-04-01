import {UserPost} from "./UserPost";
import {useEffect, useState} from "react";
import {PostTable} from "./PostTable";

export const MainPageConstructor =()=>{

    const [posts, setPosts] = useState([]);
    const [names, setNames] = useState([])

    const getPosts = async()=>{
        const allPosts = await getAllPosts();
        setPosts([allPosts]);
    }

    const getNames = async()=>{
        const allNames = await getAllNames();
        setNames([allNames]);
    }

    useEffect(()=>{
        setTimeout(()=>{
            getPosts()
            getNames();
        }, 5000)
    })

    return(
        <div>
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