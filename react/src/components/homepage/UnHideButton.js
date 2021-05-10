import {Button} from "react-bootstrap";

const UnHideButton =(props)=>{
    const {unHideFunc, postID, forceReload} = props
    return (
        <Button variant={'link'} className={'col-1 justify-content-center card-title button-no-decoration'}
                onClick={()=>{
                    unHideFunc(postID, forceReload)
                }} id={`show-post-${postID}`}>{'\u{1F4D6}'}</Button>
    )
}

export default UnHideButton;