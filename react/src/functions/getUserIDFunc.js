const getUserIDFunc = async (auth)=>{
    let response = await fetch('http://192.168.1.101:8082/users/getID', {
        headers: {
            'token': auth
        }
    })
    return await response.text();
}

export default getUserIDFunc;