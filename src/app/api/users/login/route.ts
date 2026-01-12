import connectDb from '@/db/db'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"




connectDb()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody

        //find user
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({
                error:"User does not exists"
            },{status:404})
        }

        const validatePassword = await bcryptjs.compare(password,user.password)

        if (!validatePassword){
            return NextResponse.json({
                error:"Invalid password"
            },{status:400})
        }

        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message:"Login Successfully",
            success:true
        })
        response.cookies.set("token",token,{httpOnly:true})

        return response

    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}