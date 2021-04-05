const userSearchFunc =(users, searchName)=>{
    const foundUsers = [];
    users.forEach((user)=>{
        if (user.name.includes(searchName)) {
            foundUsers.push(user);
        }
    })
    return foundUsers;
}

export default userSearchFunc;