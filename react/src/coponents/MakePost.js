import {Button} from "react-bootstrap";

const MakePost =(props)=>{

    const {setPostText, submitPostFunc} = props;

    return (
        <div className={'my-2'}>
            <h3 className={'title'}>Speak You Mind</h3>
            <textarea className={'form-control'} rows={3} id={'post-box'}
            onChange={event => {setPostText(event)}}/>
            <Button variant={'secondary'} onClick={()=>{submitPostFunc()}}>Submit Post</Button>
        </div>
    )
}

export default MakePost;