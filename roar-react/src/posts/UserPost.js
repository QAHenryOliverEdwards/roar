export const UserPost = (props) => {

    // img should be the URL link to an image to load (usually the profile picture of the poster)
    // username should be the text username of the person posting
    // postTest should be the text that wants to be rendered in the post

    const {img, username, postText} = props;

    return (
        <div>
            <div>
                <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                    <img src={img} width={100} height={100}/>
                </div>
                <div style={{display: 'inline-block'}}>
                    <h3>{username}</h3>
                </div>
            </div>
            <div>
                {postText}
            </div>
        </div>
    )
}
