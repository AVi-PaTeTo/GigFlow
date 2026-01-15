import { useState } from "react"
import GigCard from "../GigCard";
import GigCardSkeleton from "../GigCardSkeleton";
import { useBids } from "../../contexts/bidContext"

export default function HireModal(props){
    const {bids, fetchBids , loading} = useBids();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [candidateInfo, setCandidateInfo] = useState({id:'', name:''})



    function initiateHire(id, name){
        setCandidateInfo({id:id, name:name})
        setConfirmModalOpen(true)
    }

    function closeHire(){
        setCandidateInfo({id:'', name:''})
        setConfirmModalOpen(false)
    }

    async function confirmHire(){
        const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/bids/${candidateInfo.id}/hire`,{
            method : 'PATCH',
            credentials: "include",
            headers: {
                    "Content-Type": "application/json",
            }
        })

        const data = res.json()
        if (!res.ok) {
                    throw new Error(data.message || "Failed to hire bid");
                    }
        fetchBids(bids.gig._id)
        closeHire()
        return data;
        }

    return(
        <>  
            {confirmModalOpen && <div className="fixed z-60 inset-0 bg-black/50">
                <div className="w-[350px] h-full flex items-center mx-auto">
                    <div className="flex flex-col justify-center bg-violet-100 h-fit rounded-md">
                        <span className="bg-white border-b-2 py-2 w-full text-center font-bold text-2xl rounded-t-md">Confirm your action</span>
                        <p className="text-center my-4 px-6">Are you sure you want to hire {candidateInfo.name}?</p>
                        <span className="px-6 pb-6 flex justify-between">
                            <button onClick={confirmHire} className="py-1 px-3 rounded-md font-semibold  outline-2 hover:bg-green-500">Confirm</button>
                            <button onClick={closeHire} className="py-1 px-3 rounded-md font-semibold outline-2 hover:bg-gray-400 ">Cancel</button>
                        </span>
                    </div>
                </div>
            </div>}
            <div className='fixed flex justify-center inset-0 py-20 bg-black/50 overflow-y-auto z-50'>
                <div className='w-full max-w-[800px] h-fit bg-linear-to-b from-violet-200 to-violet-100 flex flex-col relative text-black rounded-md'>
                    <span className='w-full py-2 text-center font-semibold text-black/80 text-3xl bg-violet-400 relative rounded-t-md'>
                    <span className='absolute right-2'>
                        <svg onClick={props.closeHireModal} className='hover:cursor-pointer fill-black' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"/></svg>
                    </span>
                        Hire
                    </span>

                    {loading && <GigCardSkeleton />}
                    {!loading && <GigCard   id={bids.gig._id}
                                                    title={bids.gig.title}
                                                    description={bids.gig.description}
                                                    status={bids.gig.status}
                                                    duration={bids.gig.duration}
                                                    budget={bids.gig.budget}/>}

                    <div className="flex flex-col gap-2 px-4 my-5">
                        {!loading && bids.bids.map(b => (
                        <div className="group flex h-fit w-full flex-col ">
                            <span className="group relative h-fit w-full rounded-md rounded-b-[0px] bg-gray-100 p-4 text-black">
                                <span className="mb-1 flex justify-between">
                                    <span className="flex items-center gap-2 font-semibold mb-1">
                                        <span className="bg-gray-800 rounded-4xl overflow-hidden flex">
                                            <svg className="fill-violet-400 scale-150 pt-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/></svg>
                                        </span>
                                        {b.freelancerId.name}
                                    </span>
                                    <span className={`h-fit rounded-sm ${b.status == 'pending' && 'bg-amber-400'} ${b.status == 'hired' && 'bg-green-500'} ${b.status == 'rejected' && 'bg-red-500'} px-2 py-1 font-semibold text-black/70`}>{b.status}</span>
                                </span>
                                <p className="">{b.message}</p>
                            </span>
                            <div className={`hover:cursor-pointer flex h-0 w-full justify-center rounded-md rounded-t-[0px] ${bids.gig.status === 'assigned'?'bg-slate-400':' bg-green-500'} py-1 px-4 text-center text-2xl font-bold tracking-wider transition-all duration-300 ease-in-out group-hover:h-10`}>
                                <div aria-disabled={bids.gig.status === 'assigned'} onClick={() => initiateHire(b._id, b.freelancerId.name)} className="overflow-hidden flex justify-center items-center w-full">
                                    {bids.gig.status === 'assigned'?'Hiring Closed':'Hire'}
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