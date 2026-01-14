"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [user,setUser] = React.useState({
        email : "",
        password : "",
    })
    const isButtonDisabled =
        user.email.length > 0 &&
        user.password.length > 0 

    const onLogin = async () =>{
        try {
            setLoading(true)
            const login = await axios.post("/api/users/login",user)
            console.log("Login successfully",login.data)
            router.push("/profile")
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
    return(
        <>
            <div className="flex flex-col bg-gray-900/50 items-center justify-center min-h-screen py-2 ">
                <div className="flex flex-col border bg-gray-700/20 rounded-2xl p-4 gap-4 backdrop-blur-3xlshadow-[0_0_25px_rgba(255,255,255,0.10)] backdrop-saturate-150">
                    <h1 className="text-3xl font-extrabold text-white text-center">{ !loading ? "Login":"Processing"}</h1>
                    <hr />
                    <div className="flex flex-row gap-5 items-center justify-between">
                        <label className="font-mono text-xs" htmlFor="email">E-MAİL</label>
                        <input className="bg-white text-gray-700 text-xs font-mono outline-none rounded-2xl p-2" id="email" type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="email"/>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-between">
                        <label className="font-mono text-xs" htmlFor="password">PASSWORD</label>
                        <input className="bg-white text-gray-700 text-xs font-mono outline-none rounded-2xl p-2" id="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password"/>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={onLogin} className="transition-all font-mono rounded-2xl px-4 py-2 bg-green-600 hover:bg-green-500  cursor-pointer text-sm">{isButtonDisabled ? "Login":"No Login"}</button>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/forgotpassword" className="underline text-white font-mono text-sm hover:text-red-300 hover:transition-all">forgot password</Link>
                    </div>
                    <div className="flex justify-center">
                        <Link
                        href="/signup"
                        className="text-xs font-bold bg-[linear-gradient(90deg,#ec4899,#ef4444,#facc15,#4ade80,#3b82f6,#a855f7)] bg-clip-text text-transparent bg-size[length:200%_200%] animate-pulse"
                        >
                        VISIT SIGN UP PAGE
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}