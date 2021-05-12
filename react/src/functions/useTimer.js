import {useEffect, useState} from "react";
const moment = require('moment')

const useTimer =(initTime, deltaT)=>{

    const [timer, setTimer] = useState(initTime)

    useEffect(()=>{
        const initialTime = new moment()
        const updateTimer = setTimeout(()=>{
            let currentTime = new moment()
            let timeDiff = currentTime.diff(initialTime, 'milliseconds')
            let newTime = timer - timeDiff
            setTimer(newTime)
            if (timer <= 0) {
                clearTimeout(updateTimer)
            }
        }, deltaT)
        return ()=>clearTimeout(updateTimer)
    }, [deltaT, timer])

    return timer
}

export default useTimer;