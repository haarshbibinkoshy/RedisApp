import { useState } from "react"
// import { searchCar } from "./redis";


export  function SearchForm(){
    const [hits, setHits] = useState([]);

    const search=async (event) => {

        const q= event.target.value;
        console.log(q);
        if (q.length > 2) {
            const params = new URLSearchParams({q});
           const res =await fetch(`/api/search?${params}`)
const result = await res.json();
console.log(`results>>`,result);
setHits(result['cars'])
        }
    }
    return (
    <div>
        <input onChange={search}></input>
        <ul>
            {hits.map((hit)=>(
                <li key={hit.entityId}>
                
                {<img src={hit.image} ></img>}
                
                </li>
            ))}
        </ul>
    </div>
    )
}