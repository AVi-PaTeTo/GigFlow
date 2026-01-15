import { useState } from "react";
import GigCard from "../components/GigCard";
import { useGigs } from "../contexts/gigContext";
import { useEffect } from "react";

export default function Home(props){
    const { gigs, fetchGigs, refreshGig, loading } = useGigs();
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchGigs({ page: page, limit: 10, search: '' });
    }, []);
    

    function performSearch(e){
        e.preventDefault()
        fetchGigs({ page: page, limit: 10, search: search });
    }
    return(
        <>
            <div className='right-1/2 translate-x-1/2 w-full fixed flex justify-center top-15 bg-gray-200 py-5'>
                <form onSubmit={performSearch} className='flex items-center gap-4 h-15 w-full max-w-[800px]'>
                    <input  className="h-fit py-2 w-full bg-white focus:outline-0 rounded-md text-black px-3 shadow-sm" 
                            type="text" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder="Search for your next gig"/>
                    <button onClick={performSearch}
                            className='hover:cursor-pointer h-fit bg-violet-400 py-1 px-3 text-lg tracking-wide shadow-sm rounded-md font-semibold'>
                        Search
                    </button>
                </form>
            </div>
            <div className='flex flex-col gap-3 pt-[170px] pb-20 items-center min-h-full h-fit w-full bg-gray-200'>
            
            {/* gig card */}
                {loading && <span className="loader"></span>}
                {gigs && gigs.map((g) => <GigCard   id={g._id}
                                                    title={g.title}
                                                    description={g.description}
                                                    status={g.status}
                                                    budget={g.budget}
                                                    duration={g.duration}
                                                    onClick={() => {
                                                                    refreshGig(g._id)           //meant to check if user has already placed a bid
                                                                    props.openBidModal(g._id)   //not implemented right now
                                                                    }}
                                        />)}
            </div>
        </>
    )
} 