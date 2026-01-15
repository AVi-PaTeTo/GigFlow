import { useState } from "react"
import { useGigs } from "../../contexts/gigContext"
import { useUser } from "../../contexts/userContext"
import { useNavigate } from "react-router-dom"

export default function CreateModal(props){
    const navigate = useNavigate();
    const { createGig } = useGigs();
    const {user} = useUser();
    const [gigForm, setGigForm] = useState({title:'', description:'', duration:'', budget:null})


    function handleChange(e) {
        setGigForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(!user){
            props.closeCreateModal()
            navigate('/login')
            return
        }
        console.log('hit')
        createGig(gigForm)
        props.closeCreateModal()
    }

    return(
        <>
            <div className='fixed flex justify-center inset-0 py-20 bg-black/50 overflow-y-auto z-50'>
                <div className='w-full max-w-[700px] h-fit bg-linear-to-b from-violet-200 to-violet-100 flex flex-col relative text-black rounded-md'>
                    <span className='w-full py-2 text-center font-semibold text-black/80 text-3xl bg-violet-400 relative rounded-t-md'>
                    <span className='absolute right-2'>
                        <svg onClick={() => props.closeCreateModal()} className='hover:cursor-pointer fill-black' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"/></svg>
                    </span>
                    Create a new Gig
                    </span>
                    <form className='py-8 px-12 flex flex-col gap-4' action="" onSubmit={handleSubmit}>
                        <span className='flex flex-col gap-1'>
                            Title
                            <input className='py-1 px-2 bg-white rounded-sm focus:outline-0' required  type="text" name="title" placeholder="Title for the gig" value={gigForm.title} onChange={handleChange}/>
                        </span>

                        <span className='flex w-full items-center gap-8'>
                            <span className='flex flex-col gap-1 w-full'>
                            Budget
                            <input className='py-1 px-2 bg-white rounded-sm focus:outline-0' required min={0} type="number" name="budget" placeholder="Budget (monthly)" value={gigForm.budget} onChange={handleChange}/>
                            </span>
                            <span className='flex flex-col gap-1 w-full'>
                            Duration
                            <input className='py-1 px-2 bg-white rounded-sm focus:outline-0' required min={0} type="number" name="duration" placeholder="In months (i.e. 3)" value={gigForm.duration} onChange={handleChange}/>
                            </span>
                        </span>

                        <span className='flex flex-col gap-1'>
                            Description
                            <textarea className='py-1 px-2 bg-white rounded-sm focus:outline-0'  required rows={3} name="description" placeholder="Describe your gig" id="" value={gigForm.description} onChange={handleChange}></textarea>
                        </span>

                        <div className="flex items-center gap-1 mt-6 ml-auto">
                        {!user && 
                            <>
                                <p className="flex items-center font-semibold text-black/80">
                                    You might wanna login for this 
                                </p>
                                <svg className="fill-black/80" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"/></svg>
                            </>                            
                                }
                            <button className='py-1 px-3 bg-violet-400 w-fit font-semibold tracking-wide rounded-md ml-auto text-xl hover:cursor-pointer'>Create</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}