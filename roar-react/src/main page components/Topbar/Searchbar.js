export const Searchbar  =(props)=>{
    const {searchText, searchEvent} = props;

    return (
        <div className={'input-group'}>
            <input type={'text'} className={'form-control'} placeholder={'Search Here!'} id={'Search-Text'}
            value={searchText}/>
            <button className={'btn btn-secondary'} onChange={event => searchEvent(event)}>Search!</button>
        </div>
    )
}