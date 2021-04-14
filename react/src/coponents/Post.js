import {Button, Card} from "react-bootstrap";

const Post = (props) => {

    let {
        post, replyBoxProps, replyBoxFunc,
        setReplyBoxText, submitReplyFunc
    } = props;


    // return (
    //     <div>
    //         <Card className={'dark-green-bg'}>
    //             <Card.Title className={'post-name'}>{post.name}</Card.Title>
    //             <Card.Text className={'post-text'}>{post.body}</Card.Text>
    //             <Button variant={'link'} onClick={()=>{replyBoxFunc(replyBoxProps.postID)}}
    //                     className={'button-as-link px-0'}>Reply</Button>
    //         </Card>
    //     </div>
    // )

    if (replyBoxProps.isBox === false) {
        return (
            <div>
                <Card className={'dark-green-bg'}>
                    <Card.Title className={'post-name'}>{post.name}</Card.Title>
                    <Card.Text className={'post-text'}>{post.body}</Card.Text>
                    <Button variant={'link'} onClick={() => {
                        replyBoxFunc(replyBoxProps.postID)
                    }}
                            className={'button-as-link px-0'}>Reply</Button>
                </Card>
            </div>
        )
    } else {
        return (
            <div>
                <Card className={'dark-green-bg'}>
                    <Card.Title className={'post-name'}>{post.name}</Card.Title>
                    <Card.Text className={'post-text'}>{post.body}</Card.Text>
                    <textarea className={'form-control'} rows={2} onChange={(event) => {
                        setReplyBoxText(replyBoxProps.postID, event)
                    }}/>
                    <Button variant={'primary'} onClick={() => {
                        submitReplyFunc(replyBoxProps.postID)
                    }}
                    >Submit Reply</Button>
                </Card>
            </div>
        )
    }
}

export default Post;