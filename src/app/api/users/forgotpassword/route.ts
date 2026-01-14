import User from "@/models/userModel";
import connectDb from "@/db/db";
import { NextRequest,NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connectDb()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody
        console.log(email)

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({
                error:"Invalid token"
            },{status:400})
        }

        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        })

        return NextResponse.json({ message: "Reset email sent" })
    } catch (error) {
        return NextResponse.json({
            error:error
        },{status:500})
    }
}