const logoutFunc = async (setLoggedOut, setLoggedIn)=>{

    let auth = sessionStorage.getItem('auth-roar')
    let response = await fetch('http://127.0.0.1:8082/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'token': auth
        }
    })

    if (response.status === 200) {
        console.log('Successfully logged out')
        setLoggedOut(true)
        setLoggedIn(false)
    } else {
        console.log('Unsuccessful attempt')
        setLoggedOut(false)
    }
}

export default logoutFunc;