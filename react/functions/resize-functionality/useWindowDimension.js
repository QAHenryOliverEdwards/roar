import {useEffect, useState} from "react";

const getWindowDimensions =()=>{
    const {innerWidth: width, innerHeight: height} = window
    return ({width, height})
}

const useWindowDimension =()=>{
    const [windowsDimensions, setWindowsDimensions] = useState(getWindowDimensions())

    useEffect(()=>{
        const handleResize =()=>{
            setWindowsDimensions(getWindowDimensions())
        }
        window.addEventListener('resize', handleResize)
        return ()=> window.removeEventListener('resize', handleResize)
    }, [])

    return windowsDimensions
}

export default useWindowDimension;