"use client"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState("nothing")
    const onLogout = async () =>{
        try {
            setLoading(true)
            const logout = await axios.get("/api/users/logout")
            console.log("Logout Successfully",logout.data)
            router.replace("/login")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Request failed")
            } else if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Something went wrong")
            }
        } finally{
            setLoading(false)
        }
    }
    const getUserData = async () =>{
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center p-2 min-h-screen gap-1">
                <h1>{!loading ? "Profile Page" : "Logging Out"}</h1>
                <hr />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia veniam repudiandae dolor necessitatibus iusto? Saepe temporibus impedit sequi nam omnis.</p>
                <hr />
                <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <hr />
                <button onClick={onLogout} className="rounded-3xl p-2 font-mono text-amber-50 bg-red-400 cursor-pointer">Logout</button>
                <hr />
                <button onClick={getUserData} className="rounded-3xl p-2 font-mono text-amber-50 bg-purple-400 cursor-pointer">Get User Details</button>
            </div>
        </>
    )
}