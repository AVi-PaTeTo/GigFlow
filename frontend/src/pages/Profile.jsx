import { useState } from "react"
import { useGigs } from "../contexts/gigContext"
import { useEffect } from "react";
import GigCard from "../components/GigCard";
import { useUser } from "../contexts/userContext";
import { useBids } from "../contexts/bidContext";

export default function Profile(props){
    const { user } = useUser();
    const { gigs , fetchUserGigs, createGig } = useGigs();
    const { bids, myBids, fetchUserBids, fetchBids } = useBids();
    const [isCreating, setIsCreating] = useState(true);

    useEffect(() => {
        fetchUserGigs()
    },[])

    useEffect(() => {
        if(isCreating){
            fetchUserGigs()
        } else {
            fetchUserBids()
        }
    },[isCreating, bids])

    return(
        <>
        <div className='w-full h-full fixed flex justify-center top-15 bg-gray-200 py-5'>
            <div className="flex h-full w-full max-w-[1000px] relative px-3">
                <div className="w-[250px] h-full sticky top-0 shrink-0">
                    <div className="w-full">
                        <div className="py-[25px] flex flex-col items-center rounded-xl shadow-md bg-linear-to-b from-violet-400 via-violet-300 to-gray-200 text-center">
                            <div className="w-[200px] aspect-square flex rounded-[50%] overflow-hidden shadow-md mb-[25px]">
                                <img src="https://i.pinimg.com/736x/b4/97/81/b497814554033f58ddc915fff43da996.jpg" alt="" />
                            </div>
                            <h1 className="mb-2 px-4 text-2xl font-semibold">{user?user.username:'Username'}</h1>
                            <p className="mb-2 px-4">Impatiently Looking For Jobs </p>
                            <span className="flex items-center">
                                <svg className="fill-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"/></svg>
                                <svg className="fill-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"/></svg>
                                <svg className="fill-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"/></svg>
                                <svg className="fill-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m12 16.3l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"/></svg>
                                <svg className="fill-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 7.9v5.9l2.4 1.85l-.9-3.05l2.25-1.6h-2.8zm0 8.4l-3.7 2.825q-.275.225-.6.213t-.575-.188t-.387-.475t-.013-.65L8.15 13.4l-3.625-2.575q-.3-.2-.375-.525t.025-.6t.35-.488t.6-.212H9.6l1.45-4.8q.125-.35.388-.538T12 3.475t.563.188t.387.537L14.4 9h4.475q.35 0 .6.213t.35.487t.025.6t-.375.525L15.85 13.4l1.425 4.625q.125.35-.012.65t-.388.475t-.575.188t-.6-.213z"/></svg>
                                (4.5)
                            </span>
                        </div>
                        <div 
                            onClick={() => setIsCreating(true)} 
                            className={`w-full text-center text-xl tracking-wider font-semibold py-[6px] mt-5 shadow-lg rounded-md transition-all duration-100 ease-in-out hover:cursor-pointer ${!isCreating? 'bg-violet-200':'bg-violet-400'}`}>
                                My Gigs
                        </div> 
                        
                        <div 
                            onClick={() => setIsCreating(false)} 
                            className={`w-full text-center text-xl tracking-wider font-semibold py-[6px] mt-5 shadow-lg rounded-md transition-all duration-100 ease-in-out hover:cursor-pointer ${!isCreating? 'bg-violet-400':'bg-violet-200'}`}>
                                My Bids
                        </div>
                    </div>
                </div>
                
                <div className="relative flex flex-col gap-5 px-4 pb-20 w-full h-full overflow-y-auto hide-scrollbar">
                    {isCreating && <div onClick={props.openCreateModal} className="hover:cursor-pointer ml-auto w-fit text-xl tracking-wider font-semibold py-1 px-3 shadow-lg rounded-md bg-violet-400 ">Create</div>}
                    {isCreating && gigs.map((g) => <GigCard   id={g._id}
                                                                        title={g.title}
                                                                        description={g.description}
                                                                        status={g.status}
                                                                        budget={g.budget}
                                                                        duration={g.duration}
                                                                        onClick={() => {
                                                                                        fetchBids(g._id)
                                                                                        props.openHireModal()
                                                                        }}
                                                            />)}
                    {!isCreating && myBids.map(b => (
                        <div className="group flex h-fit w-full flex-col ">
                            <span className="group relative h-fit w-full rounded-md rounded-b-[0px] bg-gray-100 p-4 text-black">
                                <span className="mb-1 flex justify-between">
                                <p className="">{b.message}</p>
                                <span className={`h-fit rounded-sm ${b.status == 'pending' && 'bg-amber-400'} ${b.status == 'hired' && 'bg-green-500'} ${b.status == 'rejected' && 'bg-red-500'} px-2 py-1 font-semibold text-black/70`}>{b.status}</span>
                                </span>
                            </span>
                            <div className="-z-5 mt-auto flex h-0 w-full justify-center rounded-md rounded-t-[0px] bg-violet-300 py-1 px-4 text-center text-2xl font-bold tracking-wider transition-all duration-300 ease-in-out group-hover:h-10">
                                <div className="overflow-hidden flex justify-between items-center w-full">
                                    <p className="font-normal truncate">{b.gigId.title}</p>
                                    <span className={`h-fit rounded-sm  ${b.gigId.status=='open'? 'bg-green-500' : 'bg-sky-500'} px-2 py-[2px] font-semibold text-base text-black/70`}>{b.gigId.status}</span>    
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
        </>
    )
}