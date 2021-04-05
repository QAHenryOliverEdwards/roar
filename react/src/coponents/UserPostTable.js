import UserPost from "./UserPost";

const UserPostTable = (props) => {
    const {users} = props;

    const makePost = () => {
        const allPosts = []

        users.forEach((user) => {
                let username = user.name;
                user.posts.forEach((post) => {
                    allPosts.push(<UserPost userName={username} userPost={post.body}/>);
                })
            }
        )
        return allPosts;
    }

    return (
        <div>
            {makePost()}
        </div>
    )
}

export default UserPostTable;