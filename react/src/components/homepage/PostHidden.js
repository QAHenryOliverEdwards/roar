import {Card} from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import deleteFunc from "../../functions/button-functions/deleteFunc";
import unHideFunc from "../../functions/button-functions/unHideFunc";
import UnHideButton from "./UnHideButton";

const PostHidden = (props) => {
    const {postProps, forceReload} = props;
    if (postProps['recursion-level'] === 0) {
        return (
            <div>
                <Card className={'dark-green-bg'}>
                    <div className={'container-fluid px-0 mx-0'}>
                        <div className={'row'} style={{maxWidth: '100%'}}>
                            <Card.Title className={'post-name col-10'}>
                                <p className={'float-start'}>{postProps.name}</p>
                                <p className={'float-start warning-hidden-purple-text'}>{'This post is HIDDEN only you can see it!'}</p>
                            </Card.Title>
                            <UnHideButton unHideFunc={unHideFunc} postID={postProps.postID} forceReload={forceReload}/>
                            <DeleteButton deleteFunc={deleteFunc} postID={postProps.postID} forceReload={forceReload}/>
                        </div>
                        <div className={'row'} style={{maxWidth: '100%'}}>
                            <Card.Text className={'post-text'}>{postProps.body}</Card.Text>
                        </div>
                    </div>
                </Card>
            </div>
        )
    } else if (postProps['recursion-level'] !== 0) {
        return (
            <div>
                <Card className={'light-green-bg'}>
                    <div className={'container-fluid px-0 mx-0'}>
                        <div className={'row'} style={{maxWidth: '100%'}}>
                            <Card.Title className={'post-name col-10'}>
                                <p className={'float-start'}>{postProps.name}</p>
                                <p className={'float-start warning-hidden-purple-text'}>{'This post is HIDDEN only you can see it!'}</p>
                            </Card.Title>                            <UnHideButton unHideFunc={unHideFunc} postID={postProps.postID} forceReload={forceReload}/>
                            <DeleteButton deleteFunc={deleteFunc} postID={postProps.postID} forceReload={forceReload}/>
                        </div>
                        <div className={'row'} style={{maxWidth: '100%'}}>
                            <Card.Text className={'post-text'}>{postProps.body}</Card.Text>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default PostHidden;