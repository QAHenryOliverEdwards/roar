import {Button, Card} from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import deleteFunc from "../../functions/deleteFunc";
import EditButton from "./EditButton";
import {useState} from "react";
import editSubmitFunc from "../../functions/editSubmitFunc";

const PostEdit = (props) => {
    const {postProps, setReplyFunc, forceReload} = props;

    const [editText, setEditText] = useState('')

    const typedEditText = (event) => {
        setEditText(event.target.value)
    }

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
                    <textarea className={'form-control post-text'} rows={2} onChange={(event) => {
                        typedEditText(event)
                    }} defaultValue={postProps.body}/>
                    <Button variant={'primary'} onClick={() => {
                        editSubmitFunc(editText, postProps.postID, forceReload);
                        setReplyFunc(postProps.postID)
                    }}>Finish Edit!</Button>
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
                    <textarea className={'form-control post-text'} rows={2} onChange={(event) => {
                        typedEditText(event)
                    }} defaultValue={postProps.body}/>
                    <Button variant={'primary'} onClick={() => {
                        editSubmitFunc(editText, postProps.postID, forceReload);
                        setReplyFunc(postProps.postID)
                    }}>Finish Edit!</Button>
                </Card>
            </div>
        )
    }
}

export default PostEdit;