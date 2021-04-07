import {Card} from "react-bootstrap";

const Reply =(props)=>{
    const {post} = props;
    return (
        <div>
            <Card className={'light-green-bg'}>
                <Card.Title className={'post-name'}>{post.name}</Card.Title>
                <Card.Text className={'post-text'}>{post.body}</Card.Text>
                <Card.Text className={'post-text'}>At reply level {post.level}</Card.Text>
            </Card>
        </div>
    )
}

export default Reply;