export const Topbar =(props)=>{

    // logo should be the location of the logo image to use
    const {logo} = props;

    return (
        <div>
            <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                <img src={logo}/>
            </div>
            <div style={{display: 'inline-block'}}>
                <input type={'text'} placeholder={'Search Here!'}/>
            </div>
            <div style={{display: 'inline-block'}}>
                <button>Search</button>
            </div>
        </div>
    )
}