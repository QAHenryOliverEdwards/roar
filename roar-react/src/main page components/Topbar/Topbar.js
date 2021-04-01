import {Searchbar} from "./Searchbar";

export const Topbar =(props)=>{
    const {searchText, searchEvent} = props;
    console.log(searchEvent);
    return (
        <Searchbar searchText={searchText} searchEvent={searchEvent}/>
    )
}