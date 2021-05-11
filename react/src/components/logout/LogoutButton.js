import {Button} from "react-bootstrap";

const LogoutButton = (props) => {
    const {redirectFunc, innerText} = props

    return (
        <Button variant={'link'}
                onClick={() => {
                    redirectFunc(true)
                }} id={'logout-instantly'}>{innerText}</Button>
    )
}

export default LogoutButton;