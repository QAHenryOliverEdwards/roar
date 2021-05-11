const timeoutFlickSwitch = (funcToSwitch, toValue, waitValue) => {
    const timeoutPromise = new Promise(()=>{
        setTimeout(()=>{funcToSwitch(toValue)}, waitValue)
    })
    let value = timeoutPromise
}

export default timeoutFlickSwitch;