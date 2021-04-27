import {Button} from "react-bootstrap";

const EditButton =(props)=>{
    const {editFunc, postID} = props
    return (
        <Button variant={'link'} className={'col-1 justify-content-end card-title button-no-decoration'}
                onClick={()=>{
                    editFunc(postID)
                }}>{'\u270F'}</Button>
    )
}

export default EditButton;