export default function GigCardSkeleton(){
    return(
        <span 
            className='w-full max-w-[800px] p-4 rounded-md bg-gray-100 shadow-md hover:bg-violet-100 text-black '>
            <span className='flex justify-between mb-1'>
            <h1 className='font-bold text-xl h-7 w-[250px] bg-gray-400 animate-pulse'></h1>
            <span className={` text-black/70 font-semibold px-2 h-7 w-25 bg-gray-400 rounded-sm animate-pulse`}></span>
            </span>
            <p className='font-semibold mb-1 h-5 w-25 bg-gray-400 animate-pulse'></p>
            <p className='line-clamp-2 mb-1 h-5 w-[95%] bg-gray-400 animate-pulse'> </p>
            <p className='line-clamp-2 mb-1 h-5 w-[95%] bg-gray-400 animate-pulse'> </p>
            <p className='line-clamp-2 mb-1 h-5 w-[65%] bg-gray-400 animate-pulse'> </p>
        </span>
    )
}