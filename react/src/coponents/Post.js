import {Button, Card} from "react-bootstrap";

const Post = (props) => {

    let {
        post, replyBoxProps, replyBoxFunc,
        setReplyBoxText, submitReplyFunc, selfEditBoxProps,
        editBoxFunc, setSelfEditBoxText, submitEditFunc
    } = props;

    console.log(post)


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

    if (replyBoxProps.isBox === false && selfEditBoxProps.isEditBox === false) {
        return (
            <div>
                <Card className={'dark-green-bg'}>
                    <div className={'container-fluid px-0'}>
                        <div className={'row'}>
                            <Card.Title className={'post-name col-11'}>{post.name}</Card.Title>
                            <Button variant={'link'}
                                    className={'col-1 justify-content-end card-title button-no-decoration'}
                                    onClick={() => {
                                        editBoxFunc(selfEditBoxProps.postID)
                                    }}
                            >{'\u270F'}</Button>
                        </div>
                    </div>
                    <Card.Text className={'post-text'}>{post.body}</Card.Text>
                    <Button variant={'link'} onClick={() => {
                        replyBoxFunc(replyBoxProps.postID)
                    }}
                            className={'button-as-link px-0'}>Reply</Button>
                </Card>
            </div>
        )
    } else if (replyBoxProps.isBox === false && selfEditBoxProps.isEditBox === true) {
        return (
            <div>
                <Card className={'dark-green-bg'}>
                    <Card.Title className={'post-name'}>{post.name}</Card.Title>
                    <textarea className={'form-control'} rows={2} onChange={(event) => {
                        setSelfEditBoxText(selfEditBoxProps.postID, event)
                    }}/>
                    <Button variant={'primary'} onClick={() => {
                        submitEditFunc(selfEditBoxProps.postID)
                    }}>
                        Finish Edit!
                    </Button>
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