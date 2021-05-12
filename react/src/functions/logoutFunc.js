const logoutFunc = async (setLoggedOut)=>{

    let auth = sessionStorage.getItem('auth-roar')
    let response = await fetch('http://192.168.1.101:8082/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'token': auth
        }
    })

    if (response.status === 200) {
        console.log('Successfully logged out')
        setLoggedOut(true)
    } else {
        console.log('Unsuccessful attempt')
        setLoggedOut(false)
    }
}

export default logoutFunc;