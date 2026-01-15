export default function RegisterForm(props){
    return(
        <>
            <div className={`flex flex-col items-center w-full px-12 py-8 transition-all ease-in-out duration-200 relative ${props.isRegistering?'-translate-x-full':''}`}>
                <span onClick={() => props.setIsRegistering(prev => !prev)} className="absolute -top-3 left-4">
                    <svg className="fill-black hover:animate-hbounce hover:fill-violet-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/></svg>
                </span>
                <span className='flex text-black font-work font-black mb-6'>
                    <h1 className='text-2xl'>Create Account</h1>
                </span>
                <form id="reg" className="w-[250px] flex flex-col gap-4" onSubmit={props.handleSubmit}>
                    <span className="flex flex-col gap-1">
                        Name
                        <input className="bg-violet-100 px-1 py-1 rounded-md focus:outline-0" required type="text" name="regName" value={props.regFormData.regName} onChange={(e) => props.handleChange(e)}/>
                    </span>
                    <span className="flex flex-col gap-1">
                        Email
                        <input className="bg-violet-100 px-1 py-1 rounded-md focus:outline-0" required type="email" name="regEmail" value={props.regFormData.regEmail} onChange={(e) => props.handleChange(e)}/>
                    </span>
                    <span className="flex flex-col gap-1">
                        Password
                        <input className="bg-violet-100 px-1 py-1 rounded-md focus:outline-0" required type="password" name="regPass" value={props.regFormData.regPass} onChange={(e) => props.handleChange(e)}/>
                    </span>
                    <span className="flex flex-col gap-1">
                        Confirm Password
                        <input className="bg-violet-100 px-1 py-1 rounded-md focus:outline-0" required type="password" name="regConfPass" value={props.regFormData.regConfPass} onChange={(e) => props.handleChange(e)}/>
                    </span>
                    <button className="bg-violet-400 w-fit ml-auto mt-2 px-3 py-1 rounded-md transition-all shadow-md hover:scale-105 font-semibold tracking-wide">Register</button>
                </form>
            </div>
        </>
    )
}