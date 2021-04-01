import {UserPost} from "./UserPost";

export const PostTable =(props) => {
    const {name, post} = props;
    const makePostList =()=>{
        let allPosts = [];
        for (let i in name) {
            console.log(post[i][0]['body']);
            allPosts.push(<UserPost username={name[i]} postText={post[i][0]['body']}/>)
        }

        return allPosts;
    }

    return (
        <div>
            <ul>{makePostList()}</ul>
        </div>
    )
}