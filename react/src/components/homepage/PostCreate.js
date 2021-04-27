import {Button} from "react-bootstrap";
import {useState} from "react";
import submitPostFunc from "../../functions/submitPostFunc";

const PostCreate = (props) => {

    const {forceReload} = props;

    const [postCreateText, setPostCreateText] = useState('')

    const userSetPostCreateText = (event) => {
        setPostCreateText(event.target.value)
    }

    const resetPostCreationBox = () =>{
        let textbox = document.querySelector('#post-box')
        textbox.value = ''
        setPostCreateText('')
    }

    return (
        <div>
            <h2 className={'title'}>Speak Your Mind</h2>
            <textarea className={'form-control'} rows={3} id={'post-box'} onChange={(event) => {
                userSetPostCreateText(event)
            }
            }/>
            <Button variant={'secondary'} className={'form-control'} onClick={() => {
                submitPostFunc(postCreateText, forceReload); resetPostCreationBox()
            }}>Submit</Button>
        </div>
    )
}

export default PostCreate;