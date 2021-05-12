const moment = require('moment')

const redirectTimer = (waitTime, setTimeFunc) => {
    const initialTime = new moment()
    let currentTime = new moment()
    const timer = setInterval(()=>{
        currentTime = new moment()
        let timeDiff = currentTime.diff(initialTime, 'second')
        let timeToShow = waitTime - timeDiff
        setTimeFunc(timeToShow)
        if (timeDiff > waitTime) {
            clearInterval(timer)
        }
    }, 100)
}

export default redirectTimer;