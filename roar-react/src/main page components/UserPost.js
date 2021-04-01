export const UserPost = (props) => {

    // img should be the URL link to an image to load (usually the profile picture of the poster)
    // username should be the text username of the person posting
    // postTest should be the text that wants to be rendered in the post

    const {username, postText} = props;

    return (
        <div>
            <h3 className={'post-name'}>{username}</h3>
            <p className={'post-text'}>{postText}</p>
        </div>
    )
}
