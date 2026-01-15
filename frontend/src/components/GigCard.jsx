export default function GigCard(props){
    return(
        <span 
            key={props.id}
            onClick={props.onClick}
            className='w-full max-w-[800px] p-4 rounded-md bg-gray-100 shadow-md hover:bg-violet-100 text-black '>
            <span className='flex justify-between mb-1'>
            <h1 className='font-bold text-xl'>{props.title}</h1>
            <span className={`${props.status === 'open'?'bg-green-400':'bg-sky-500'} text-black/70 font-semibold px-2 py-1 rounded-sm`}>{props.status}</span>
            </span>
            <span className="flex gap-2 font-semibold mb-1">
                
                <p className=' mb-1 w-45'>₹{props.budget} per month</p> 
                <span className="flex gap-1 ">
                    <p className=' mb-1 min-w-7 text-end'>{props.duration}</p>
                    <p>{props.duration>1?'Months':'Month'}</p>
                </span>
            </span>
            <p className='line-clamp-2'>{props.description}</p>
        </span>
    )
}