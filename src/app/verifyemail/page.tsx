"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

export default function VerifyEmailPages() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")  

  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    const verify = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token })
        setVerified(true)
      } catch (err) {
        setError(true)
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Verification failed")
        } else {
          toast.error("Something went wrong")
        }
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [token])

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
        <h1 className="p-2 rounded-2xl bg-orange-600 font-mono ">{token}</h1>
      {loading && <p>Verifying...</p>}
      {verified && <p className="text-green-500">Email verified 🎉</p>}
      {error && <p className="text-red-500">Verification failed ❌</p>}
    </div>
  )
}
