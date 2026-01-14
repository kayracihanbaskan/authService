"use client"

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter, useParams } from "next/navigation"

export default function ResetPasswordPage() {
  const { token } = useParams()
  const router = useRouter()

  const [correctPassword,setCorrectPassword] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const resetPassword = async () => {
    try {
      if(password === correctPassword){
        setLoading(true)
        await axios.post("/api/users/resetpassword", {
            token,
            password,
        })
        toast.success("Password reset successful 🔐")
        router.push("/login")
      }else{
        toast.error("Password is not match correct password")
      }
    } catch (err) {
      toast.error("Reset link is invalid or expired")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl flex flex-col gap-4">
        <h1 className="text-xl font-bold">Reset Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="p-2 rounded bg-white text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Correct password"
          className="p-2 rounded bg-white text-black"
          value={correctPassword}
          onChange={(e) => setCorrectPassword(e.target.value)}
        />

        <button
          onClick={resetPassword}
          disabled={loading}
          className="bg-green-600 p-2 rounded hover:bg-green-500"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  )
}
