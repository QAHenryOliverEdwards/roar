import {Button, Card} from "react-bootstrap";

const Reply = (props) => {

    const {
        post, selfEditBoxProps, editBoxFunc,
        setSelfEditBoxText, submitEditFunc,
        deleteFunc
    } = props;

    if (selfEditBoxProps.isEditBox === false) {
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
                                    onClick={()=>{
                                        deleteFunc(post.postID)
                                    }}>{'\u{1F5D1}'}</Button>
                        </div>
                    </div>
                    <Card.Text className={'post-text'}>{post.body}</Card.Text>
                    <Card.Text className={'post-text'}>At reply level {post.level}</Card.Text>
                </Card>
            </div>
        )
    } else if (selfEditBoxProps.isEditBox === true) {
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
    }
}

export default Reply;