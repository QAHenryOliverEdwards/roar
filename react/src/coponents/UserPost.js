import {Card} from "react-bootstrap";

const UserPost = (props) => {
    const {userName, userPost} = props;
    return (
        <div>
            <Card className={'dark-green-bg'}>
                <Card.Title className={'post-name'}>{userName}</Card.Title>
                <Card.Text className={'post-text'}>{userPost}</Card.Text>
            </Card>
            <br/>
        </div>
    )
}

export default UserPost;