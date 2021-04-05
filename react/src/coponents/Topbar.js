import {InputGroup, Button} from "react-bootstrap";

const Topbar = (props) => {
    const {userInputFunc, searchFunc} = props;
    return (
        <InputGroup className={'my-3'}>
            <input type={'search'} onChange={event => userInputFunc(event)} className={'form-control'}/>
            <Button variant={'secondary'} onClick={()=>(searchFunc())}>Search!</Button>
        </InputGroup>
    )
}

export default Topbar;