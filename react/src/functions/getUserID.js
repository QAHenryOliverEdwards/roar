const getUserID = async (auth)=>{
    let response = await fetch('http://127.0.0.1:8082/users/getID', {
        headers: {
            'token': auth
        }
    })
    return await response.text();
}

export default getUserID;