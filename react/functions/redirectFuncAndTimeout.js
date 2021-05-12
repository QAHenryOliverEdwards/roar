const redirectFuncAndTimeout = (funcToSwitch, valueToSwitch, waitTime)=>{
    const timeoutPromise = new Promise(()=>{
        setTimeout(()=>{funcToSwitch(!valueToSwitch)}, waitTime)
    })
    return timeoutPromise
}

export default redirectFuncAndTimeout;