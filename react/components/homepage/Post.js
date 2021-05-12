import {Card} from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import deleteFunc from "../../functions/button-functions/deleteFunc";
import EditButton from "./EditButton";
import HideButton from "./HideButton";
import hideFunc from "../../functions/button-functions/hideFunc";

const Post = (props) => {
    const {postProps, setReplyFunc, forceReload} = props;
    if (postProps['recursion-level'] === 0) {
        return (
            <div>
                <Card className={'dark-green-bg'}>
                    <div className={'container-fluid px-0 mx-0'}>
                        <div className={'row'} style={{maxWidth: '100%'}}>
                            <Card.Title className={'post-name col-9'}>{postProps.name}</Card.Title>
                            <HideButton hideFunc={hideFunc} postID={postProps.postID} forceReload={forceReload}/>
                            <EditButton editFunc={setReplyFunc} postID={postProps.postID}/>
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
                            <Card.Title className={'post-name col-9'}>{postProps.name}</Card.Title>
                            <HideButton hideFunc={hideFunc} postID={postProps.postID}/>
                            <EditButton editFunc={setReplyFunc} postID={postProps.postID}/>
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

export default Post;