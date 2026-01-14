import connectDb from "@/db/db"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"

connectDb()

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      )
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex")

    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Reset link is invalid or expired" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    })

  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}
