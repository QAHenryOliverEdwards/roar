const loginFunc = async (username, password, setLoginFunc) => {

    let response = await fetch('http://127.0.0.1:8082/users/login', {
        method: 'POST',
        headers: {
            'username': username,
            'password': password
        }
    })

    let auth_key = await response.text();

    if (auth_key !== 'INVALID') {
        sessionStorage.setItem('auth-roar', auth_key);
        console.log('Successfully logged in');
        setLoginFunc(true);
    } else {
        console.log('Unsuccessful attempt');
    }
}

export default loginFunc;