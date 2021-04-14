import {Button} from "react-bootstrap";

const MakePost =(props)=>{

    const {setPostText, submitPostFunc} = props;

    return (
        <div className={'my-2'}>
            <h3 className={'title'}>Speak Your Mind</h3>
            <textarea className={'form-control'} rows={3} id={'post-box'}
            onChange={event => {setPostText(event)}}/>
            <Button variant={'secondary'} onClick={()=>{submitPostFunc()}}
            className={'form-control'}>Submit Post</Button>
        </div>
    )
}

export default MakePost;