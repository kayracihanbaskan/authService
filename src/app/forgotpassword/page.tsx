"use client"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";


export default function ForgotPasswordPage(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState("")
    const sendForgotPasswordMail = async () =>{
        try {
            setLoading(true)
            await axios.post("/api/users/forgotpassword",{email})
            toast.success("Reset link sent to your email 📩")
            router.push("/login")
        } catch (error) {
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data?.message || "Request Failed")
            }else if (error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-900/50 items-center justify-center">
                <div className="flex flex-col border bg-gray-700/20 rounded-2xl p-4 gap-4 backdrop-blur-3xlshadow-[0_0_25px_rgba(255,255,255,0.10)] backdrop-saturate-150">
                    <h1 className="font-extrabold text-xl">{loading ? "Sending Mail" : "Forgot Password"}</h1>
                    <hr />
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="resetmail">Reset Email :</label>
                        <input className="bg-white rounded-2xl font-mono text-xs text-gray-800 p-2 " id="resetmail" type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <button disabled={loading} type="button" className="bg-green-700 rounded-3xl transition-all p-1 hover:bg-green-600 cursor-pointer font-mono text-sm" onClick={sendForgotPasswordMail}>Send Mail</button>
                </div>
            </div>
        </>
    )
}