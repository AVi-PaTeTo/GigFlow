import { useState } from "react"
import LoginForm from "../components/Login/LoginForm"
import RegisterForm from "../components/Login/RegisterForm"
import { useUser } from "../contexts/userContext"
import { useNavigate } from "react-router-dom";

export default function Login(){
    const { refetchUser } = useUser();
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const apiURL = import.meta.env.VITE_API_ENDPOINT;
    const [isRegistering, setIsRegistering] = useState(false)
    const [loginFormData, setLoginFormData] = useState({logEmail:'', logPass:''})
    const [regFormData, setRegFormData] = useState({regName:'', regEmail:'', regPass:'', regConfPass: ''})



    function handleChange(e){
        if (['logEmail', 'logPass'].includes(e.target.name)){
            setLoginFormData(prev => ({...prev, [e.target.name]: e.target.value}))
        } else if (['regName', 'regEmail', 'regPass', 'regConfPass'].includes(e.target.name)) {
            setRegFormData(prev => ({...prev, [e.target.name]: e.target.value}))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let form = null;
        let endpoint = null;

        if (e.target.id === "login") {
            form = { email: loginFormData.logEmail, password: loginFormData.logPass };
            endpoint = `${apiURL}/api/auth/login`;
        } else if (e.target.id === "reg") {
            form = { name: regFormData.regName, email: regFormData.regEmail, password: regFormData.regPass };
            endpoint = `${apiURL}/api/auth/register`;
        }

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "An error occurred");
                return;
            }

            await refetchUser();
            setError('')
            navigate('/');

        } catch (err) {
            console.error("Connection failed:", err.message);
        }
    }

    return(
        <>
        <div className='h-full w-full bg-linear-to-b from-violet-100 to-violet-300'>
            <div className="mx-auto w-[350px] h-full text-black flex items-center">
                <div className="bg-white h-[490px] w-full flex items-center rounded-md shadow-lg overflow-hidden">

                    {/* Login form */}
                    <LoginForm
                        error={error}
                        handleSubmit={handleSubmit}
                        loginFormData={loginFormData} 
                        handleChange={handleChange}
                        isRegistering={isRegistering} 
                        setIsRegistering={setIsRegistering}/>

                    {/* Register Form */}
                    <RegisterForm 
                        handleSubmit={handleSubmit}
                        regFormData={regFormData}
                        handleChange={handleChange}
                        isRegistering={isRegistering} 
                        setIsRegistering={setIsRegistering}/>
                    
                </div>
            </div>
        </div>
    </>
    )
}