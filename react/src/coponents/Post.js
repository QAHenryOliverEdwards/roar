import {Card} from "react-bootstrap";

const Post =(props)=>{
    const {post} = props;
    return (
        <div>
            <Card className={'dark-green-bg'}>
                <Card.Title className={'post-name'}>{post.name}</Card.Title>
                <Card.Text className={'post-text'}>{post.body}</Card.Text>
            </Card>
        </div>
    )
}

export default Post;