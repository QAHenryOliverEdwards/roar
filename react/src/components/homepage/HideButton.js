import {Button} from "react-bootstrap";

const HideButton = (props) => {
    const {hideFunc, postID, forceReload} = props
    return (
        <Button variant={'link'} className={'col-1 justify-content-center card-title button-no-decoration'}
                onClick={() => {
                    hideFunc(postID, forceReload)
                }} id={`hide-post-${postID}`}>{'\u{1F4D5}'}</Button>
    )
}

export default HideButton;