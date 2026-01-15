export default function LoginForm(props){
    return(
        <>
            <div className={`flex flex-col items-center w-full px-12 py-8 transition-all ease-in-out duration-200 ${props.isRegistering?'-translate-x-full':''}`}>
                <span className='flex text-black font-work font-black mb-3'>
                    <h1 className='text-6xl'>GIG</h1>
                    <p className='mt-auto text-2xl'>FLOW</p>
                </span>
                <p className="mb-12">Flow into your next big gig</p>
                <form id="login" className=" relative w-[250px] flex flex-col gap-4" onSubmit={props.handleSubmit}>
                    {props.error && <p className="absolute -top-6 text-red-600 font-semibold">{props.error}</p> }
                    <span className="flex flex-col gap-1">
                        Email
                        <input className="bg-violet-100 px-1 py-1 rounded-md focus:outline-0" type="email" required name="logEmail" value={props.loginFormData.email} onChange={(e) => props.handleChange(e)}/>
                    </span>
                    <span className="flex flex-col gap-1">
                        Password
                        <input className="bg-violet-100 px-1 py-1 rounded-md focus:outline-0" type="password" required name="logPass" value={props.loginFormData.password} onChange={(e) => props.handleChange(e)}/>
                    </span>
                    <button className="bg-violet-400 w-fit ml-auto mt-2 px-3 py-1 rounded-md transition-all shadow-md hover:scale-105 font-semibold tracking-wide">Login</button>
                </form>
                <span onClick={() => props.setIsRegistering(prev => !prev)} className="flex items-center gap-2 mt-12 hover:text-violet-400 hover:cursor-pointer group">
                    Create Account
                    <svg className="group-hover:fill-violet-400 group-hover:animate-hbounce" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"/></svg>
                </span>
            </div>
        </>
    )
}