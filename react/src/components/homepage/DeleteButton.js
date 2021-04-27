import {Button} from "react-bootstrap";

const DeleteButton = (props) => {
    const {deleteFunc, postID, forceReload} = props
    return (
        <Button variant={'link'} className={'col-1 justify-content-end card-title button-no-decoration'}
                onClick={() => {
                    deleteFunc(postID, forceReload)
                }}>{'\u{1F5D1}'}</Button>
    )
}

export default DeleteButton;