import {Card} from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import deleteFunc from "../../functions/deleteFunc";
import EditButton from "./EditButton";

const Post = (props) => {
    const {postProps, setReplyFunc} = props;
    if (postProps['recursion-level'] === 0) {
        return (
            <div>
                <Card className={'dark-green-bg'}>
                    <div className={'container-fluid px-0'}>
                        <div className={'row'}>
                            <Card.Title className={'post-name col-10'}>{postProps.name}</Card.Title>
                            <EditButton editFunc={setReplyFunc} postID={postProps.postID}/>
                            <DeleteButton deleteFunc={deleteFunc} postID={postProps.postID}/>
                        </div>
                    </div>
                    <Card.Text className={'post-text'}>{postProps.body}</Card.Text>
                </Card>
            </div>
        )
    } else if (postProps['recursion-level'] !== 0) {
        return (
            <div>
                <Card className={'light-green-bg'}>
                    <div className={'container-fluid px-0'}>
                        <div className={'row'}>
                            <Card.Title className={'post-name col-10'}>{postProps.name}</Card.Title>
                            <EditButton editFunc={setReplyFunc} postID={postProps.postID}/>
                            <DeleteButton deleteFunc={deleteFunc} postID={postProps.postID}/>
                        </div>
                    </div>
                    <Card.Text className={'post-text'}>{postProps.body}</Card.Text>
                </Card>
            </div>
        )
    }
}

export default Post;