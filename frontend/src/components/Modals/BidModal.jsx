import { useState, useEffect } from "react";
import { useGigs } from "../../contexts/gigContext"
import GigCard from "../GigCard";
import { useBids } from "../../contexts/bidContext";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";


export default function BidModal(props){
    const navigate = useNavigate();
    const { createBid } = useBids();
    const { user } = useUser();
    const { gigs } = useGigs();
    const [gig, setGig] = useState({id: '', title:'', description:'', status:'', budget:'', duration: '', placedBid:false})
    const [message, setMessage] = useState('')


    useEffect(() => {
        const g = gigs.find(gig => gig._id === props.id)
        if (!g) return;

        setGig({
                id: g._id, 
                title: g.title, 
                description: g.description, 
                budget: g.budget,
                status: g.status,
                duration: g.duration,
                placedBid:g.placedBid
            });

        return () => {
            // runs on unmount
            setGig({
                id: '', 
                title:'', 
                description:'',
                status:'', 
                budget:'',
                duration:'',
                placedBid: false
            });
        };
    }, []);

    function handleSubmit(e){
        e.preventDefault()
        if(!user){
            props.closeBidModal()
            navigate('/login')
            return
        }
        createBid({gigId: gig.id, message: message})
        props.closeBidModal()
    }

    return(
        <>
            <div className='fixed flex justify-center inset-0 py-20 bg-black/50 overflow-y-auto z-50'>
                <div className='w-full max-w-[700px] h-fit bg-linear-to-b from-violet-200 to-violet-100 flex flex-col text-black rounded-md'>
                    <span className='w-full py-3 flex justify-center items-center font-semibold text-black/80 text-2xl bg-violet-400 relative rounded-t-md'>
                        <span className='absolute right-2'>
                            <svg onClick={props.closeBidModal} className='hover:cursor-pointer fill-black' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"/></svg>
                        </span>
                        <p className="w-[88%] text-center truncate">Bidding for {gig.title}</p>
                    </span>
                    <GigCard    id={gig.id}
                                title={gig.title}
                                description={gig.description}
                                status={gig.status}
                                budget={gig.budget}
                                duration={gig.duration}/>
                    
                    <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-2'>
                        <p className="font-semibold">Place a bid</p>
                        <textarea className='bg-white p-1 focus:outline-0 ' required rows={3} name="" id="" placeholder="Why are you interested on this gig" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        <span className="flex items-center ml-auto mt-6 gap-2">
                            {!user && 
                                <>
                                    <p className="flex items-center font-semibold text-black/80">
                                        You might wanna login for this 
                                    </p>
                                    <svg className="fill-black/80" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"/></svg>
                                </>                            
                                    }
                            <button className='hover:cursor-pointer px-3 py-1 text-lg shadow-sm rounded-md bg-violet-400 font-semibold'>Send</button>
                        </span>
                    </form>

                </div>
            </div>
        </>
    )
}