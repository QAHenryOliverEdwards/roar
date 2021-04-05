import {Card} from "react-bootstrap";

const UserPost = (props) => {
    const {userName, userPost} = props;
    return (
        <div>
            <Card border={'info'}>
                <Card.Title>{userName}</Card.Title>
                <Card.Text>{userPost}</Card.Text>
            </Card>
            <br/>
        </div>
    )
}

export default UserPost;