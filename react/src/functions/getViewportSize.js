// https://stackoverflow.com/questions/45394053/how-to-detect-screen-size-or-view-port-on-bootstrap-4-with-javascript/55368012

const getViewportSize =()=> {
    // https://stackoverflow.com/a/8876069
    const width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    )
    if (width <= 576) return 'xs'
    if (width <= 768) return 'sm'
    if (width <= 992) return 'md'
    if (width <= 1200) return 'lg'
    return 'xl'
}

export default getViewportSize;