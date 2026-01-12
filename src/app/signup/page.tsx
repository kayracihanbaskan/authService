"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [user,setUser] = React.useState({
        email : "",
        password : "",
        username : "", 
    })
    const onSignup = async () =>{
        try {
            setLoading(true)
            const signup = await axios.post("/api/users/signup",user)
            console.log("Signup successfully",signup.data)
            router.push("/login")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Request failed")
            } else if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong")
            }
        }finally{
            setLoading(false)
        }
    } 

    const isButtonDisabled =
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.username.length > 0

    return(
        <>
            <div className="flex flex-col bg-gray-900/50 items-center justify-center min-h-screen py-2 ">
                <div className="flex flex-col border bg-gray-700/20 rounded-2xl p-4 gap-4 backdrop-blur-3xl
                    shadow-[0_0_25px_rgba(255,255,255,0.10)] backdrop-saturate-150">
                    <h1 className="text-3xl font-extrabold text-white text-center">{ !loading ? "Signup":"Processing"}</h1>
                    <hr />
                    <div className="flex flex-row gap-5 items-center justify-between">
                        <label className="font-mono text-xs" htmlFor="username">USERNAME</label>
                        <input className="bg-white text-gray-700 text-xs font-mono outline-none rounded-2xl p-2" id="username" type="text" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="username"/>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-between">
                        <label className="font-mono text-xs" htmlFor="email">E-MAİL</label>
                        <input className="bg-white text-gray-700 text-xs font-mono outline-none rounded-2xl p-2" id="email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="email"/>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-between">
                        <label className="font-mono text-xs" htmlFor="password">PASSWORD</label>
                        <input className="bg-white text-gray-700 text-xs font-mono outline-none rounded-2xl p-2" id="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password"/>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={onSignup} className="transition-all font-mono rounded-2xl px-4 py-2 bg-green-600 hover:bg-green-500  cursor-pointer text-sm">{isButtonDisabled ? "Signup":"No Signup"}</button>
                    </div>
                    <div className="flex justify-center">
                        <Link
                        href="/login"
                        className="text-xs font-bold bg-[linear-gradient(90deg,#ec4899,#ef4444,#facc15,#4ade80,#3b82f6,#a855f7)] bg-clip-text text-transparent bg-size[length:200%_200%] animate-pulse"
                        >
                        VISIT LOGIN PAGE
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}