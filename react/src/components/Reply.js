import {Button, Card} from "react-bootstrap";

const Reply = (props) => {

    const {
        post, selfEditBoxProps, editBoxFunc,
        setSelfEditBoxText, submitEditFunc,
        deleteFunc, editButtons, replyBoxProps,
        replyBoxFunc, setReplyBoxText, submitReplyFunc
    } = props;

    if (selfEditBoxProps.isEditBox === false && editButtons === true && replyBoxProps.isBox === false) {
        return (
            <div>
                <Card className={'light-green-bg'}>
                    <div className={'container-fluid px-0'}>
                        <div className={'row'}>
                            <Card.Title className={'post-name col-10'}>{post.name}</Card.Title>
                            <Button variant={'link'}
                                    className={'col-1 justify-content-end card-title button-no-decoration'}
                                    onClick={() => {
                                        editBoxFunc(selfEditBoxProps.postID)
                                    }}
                            >{'\u270F'}</Button>
                            <Button variant={'link'}
                                    className={'col-1 justify-content-end card-title button-no-decoration'}
                                    onClick={() => {
                                        deleteFunc(post.postID)
                                    }}>{'\u{1F5D1}'}</Button>
                        </div>
                    </div>
                    <Card.Text className={'post-text'}>{post.body}</Card.Text>
                    <Button variant={'link'} onClick={() => {
                        replyBoxFunc(replyBoxProps.postID)
                    }} className={'button-as-link px-0'}>Reply</Button>
                    <Card.Text className={'post-text'}>At reply level {post.level}</Card.Text>
                </Card>
            </div>
        )
    } else if (selfEditBoxProps.isEditBox === false && editButtons === false && replyBoxProps.isBox === false) {
        return (
            <div>
                <Card className={'light-green-bg'}>
                    <div className={'container-fluid px-0'}>
                        <div className={'row'}>
                            <Card.Title className={'post-name col-12'}>{post.name}</Card.Title>
                        </div>
                    </div>
                    <Card.Text className={'post-text'}>{post.body}</Card.Text>
                    <Button variant={'link'} onClick={() => {
                        replyBoxProps(replyBoxProps.postID)
                    }} className={'button-as-link px-0'}>Reply</Button>
                    <Card.Text className={'post-text'}>At reply level {post.level}</Card.Text>
                </Card>
            </div>
        )
    } else if (selfEditBoxProps.isEditBox === true && replyBoxProps.isBox === false) {
        return (
            <div>
                <Card className={'light-green-bg'}>
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
                <Card className={'light-green-bg'}>
                    <Card.Title className={'post-name'}>{post.name}</Card.Title>
                    <Card.Text className={'post-text'}>{post.body}</Card.Text>
                    <textarea className={'form-control'} rows={2} onChange={(event)=>{
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

export default Reply;