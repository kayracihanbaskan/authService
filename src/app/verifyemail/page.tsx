import { Suspense } from "react"
import VerifyEmailClient from "./VerifyEmailClient"

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <VerifyEmailClient />
    </Suspense>
  )
}
