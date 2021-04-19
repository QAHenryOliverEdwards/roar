const getUserID = async (auth)=>{
    let response = await fetch('http://roar-env.eba-hb5rpyxz.eu-west-2.elasticbeanstalk.com/users/getID', {
        headers: {
            'token': auth
        }
    })
    return await response.text();
}

export default getUserID;