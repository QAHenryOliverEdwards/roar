const getUsername = async (userID)=>{
    let response = await fetch(`http://localhost:8082/users/read/${userID}`)
    let userInfo = await response.json()
    return userInfo.name
}

export default getUsername;