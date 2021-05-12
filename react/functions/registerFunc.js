import loginFunc from "./loginFunc";

const registerFunc = async (username, name, email, password, setLoginFunc)=>{

    let bodyObj = {
        'username': username,
        'name': name,
        'email': email,
        'password': password
    }

    let response = await fetch('http://127.0.0.1:8082/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    })

    if (response.status === 201) {
        console.log('Successfully created');
        await loginFunc(username, password, setLoginFunc);
    } else {
        console.log('Unsuccessful!')
    }
}

export default registerFunc;